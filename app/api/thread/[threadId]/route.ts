import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { threadId: string } }
) {
  try {
    const user = await currentUser();
    const profile = await currentProfile();
    if (!user) {
      return redirectToSignIn();
    }
    const body = await req.json();

    const { content } = body;

    if (!profile) {
      return new NextResponse("Profile doesn't exist.", { status: 400 });
    }

    if (!params.threadId) {
      return new NextResponse("Thread ID is required", { status: 400 });
    }

    const checkThread = await db.thread.findFirst({
      where: {
        id: params.threadId,
      },
    });

    if (!checkThread) {
      return new NextResponse("Thread doesnt exist.", { status: 400 });
    }
    if (checkThread.profileIds.includes(profile.id)) {
      const newPost = await db.post.create({
        data: {
          content,
          threadId: params.threadId,
          threadTitle: checkThread.title,
          profileId: profile.id,
          profileName: profile.name,
          profileImageUrl: profile.imageUrl,
        },
      });

      const thread = await db.thread.update({
        where: {
          id: params.threadId,
        },
        data: {
          postIds: {
            push: newPost.id,
          },
        },
      });

      return NextResponse.json(thread);
    } else {
      const newPost = await db.post.create({
        data: {
          content,
          threadId: params.threadId,
          threadTitle: checkThread.title,
          profileId: profile.id,
          profileName: profile.name,
          profileImageUrl: profile.imageUrl,
        },
      });

      const thread = await db.thread.update({
        where: {
          id: params.threadId,
        },
        data: {
          postIds: {
            push: newPost.id,
          },
          profileIds: {
            push: profile.id,
          },
        },
      });

      return NextResponse.json(thread);
    }
  } catch (error) {
    console.log("[THREAD_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { threadId: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return redirectToSignIn();
    }

    const profile = await db.profile.findFirst({
      where: {
        clerkId: user.id,
      },
    });
    if (!profile) {
      return new NextResponse("Profile not found", { status: 400 });
    }

    const deletedThread = await db.thread.delete({
      where: {
        id: params.threadId,
      },
    });

    await db.post.deleteMany({
      where: {
        threadId: params.threadId,
      },
    });

    return NextResponse.json(deletedThread);
  } catch (error) {
    console.log("[THREAD_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

import Image from "next/image";

interface LandingPageProps {}

const LandingPage = () => {
  return (
    <div>


<div className="min-h-screen grid grid-cols-2 justify-between">
  <div>
    <Image src="/images/logo.png" width={250} height={250} alt="logo" />
  </div>

<div className="flex flex-col items-center justify-center">
<h1>HELLO GROUPIES!</h1>
<h2>Welcome to the internets hottest new grouping application.</h2>
<h3>Align with groups that have your interests quickly.</h3>
<h4>Plan events with your friends in a public or private setting.</h4>
<h5>and much... much... more.</h5>
</div>

</div>

<article>
  <div className="flex flex-col items-center justify-center">
    <h1>GROUPIES</h1>
    <h2>Create your own group.</h2>
  </div>
</article>

<article>
  <div className="flex flex-col items-center justify-center">
    <h1>Join</h1>
    <h2>Join Another group.</h2>
  </div>
</article>

<article>
  <div className="flex flex-col items-center justify-center">
    <h1>Task Management</h1>
    <h2>Manage tasks in a team environment.</h2>
  </div>
</article>

<article>
  <div className="flex flex-col items-center justify-center">
    <h1>Event Management</h1>
    <h2>Plan and participate in events with or without a group.</h2>
  </div>
</article>





</div>
  );
}
export default LandingPage;
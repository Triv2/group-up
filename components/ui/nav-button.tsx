'use client'

import Link from 'next/link';

import {useState, useEffect} from'react'
import { Button } from './button';

interface NavButtonProps {
  href: string;
  text?: string;
  className?: string;
  icon?:JSX.Element;
}

const NavButton:React.FC<NavButtonProps> = ({
  href,
  text,
  className,
  icon
}) => {


const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}
  return (
    <Button variant="blend" asChild>
    <Link className={className} href={href}>
      {icon}{text}
    </Link>
    </Button>
  );
}
export default NavButton;
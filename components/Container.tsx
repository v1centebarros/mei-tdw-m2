import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  title: string;
}

export default function Container({ children, title }: Readonly<ContainerProps>) {

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl text-center font-extrabold mb-4">{title}</h1>
      {children}
    </main>
  );
}
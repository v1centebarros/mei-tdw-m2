import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  title: string;
}

export default function Container({
  children,
  title,
}: Readonly<ContainerProps>) {
  return (
    <main className="container mx-auto p-4">
      <h1 className="mb-4 text-center text-4xl font-extrabold">{title}</h1>
      {children}
    </main>
  );
}

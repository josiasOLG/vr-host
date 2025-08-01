import { GetServerSideProps } from "next";

export default function Home() {
  return <div>Redirecionando...</div>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/dashboard",
      permanent: false,
    },
  };
};

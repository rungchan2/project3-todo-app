import React from "react";
import { Link } from "react-router-dom";

import { useStore } from "@/hooks/useStore";

const Home: React.FC = (): React.ReactElement => {
  const count = useStore((state) => state.count);

  return (
    <section>
      <h1>안녕하세용</h1>
      <p>보일러플레이트 사용해서 만든 페이지입니다.</p>
      <p>Current count: {count}</p>
      <Link to="/count">Go to count page</Link>
    </section>
  );
};

export default Home;

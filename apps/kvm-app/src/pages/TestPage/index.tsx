import React from "react";
import Loading from "@/components/Loading/Loading";

const TestPage: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginTop: "20px" }}>
        <Loading />
      </div>
    </div>
  );
};

export default TestPage;

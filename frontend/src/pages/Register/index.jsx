/* eslint-disable no-unused-vars */
import React from "react";
import { useSearchParams } from "react-router-dom";
import GenerateToken from "../GenerateToken";
import SignUp from "../SignUp";

export default function Register() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  return <>{token ? <SignUp token={token}/> : <GenerateToken />}</>;
}

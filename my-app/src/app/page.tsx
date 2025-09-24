"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async () => {
    await authClient.signUp.email({
      email,
      name,
      password
    }, {
      onError: () => {
        alert("Something went wrong")
      },
      onSuccess: () => {
        alert("User created successfully")
      }
    })
  }

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <Input 
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleSubmit}>Create User</Button>
    </div>
  )
}

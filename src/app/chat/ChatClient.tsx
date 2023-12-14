"use client";
import Chat from "@/components/chat/Chat";
import Contacts from "@/components/chat/Contacts";
import { TUserWithChat } from "@/types";
import { User } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

interface ChatClientProps {
  currentUser?: User | null;
}

const ChatClient = ({ currentUser }: ChatClientProps) => {
  const [receiver, setReceiver] = useState({
    receiverId: "",
    receiverName: "",
    receiverImage: "",
  });

  const [layout, setLayout] = useState(false);

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const {
    data: users,
    error,
    isLoading,
  } = useSWR("/api/chat", fetcher, {
    refreshInterval: 1000,
  });

  console.log(users);

  const currentUserWithMessage = users?.find(
    (user: TUserWithChat) => user.email === currentUser?.email
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <main>
      <div className="grid grid-cols-[1fr] md:grid-cols-[300px_1fr]">
        {/* md보다 클 때는 왼쪽 영역과 오른쪽 영역 둘 다 보이게 */}
        {/* md보다 작고 layout이 true일 때는 contact 영역이 안 보이게 */}
        <section className={`md:flex ${layout && "hidden"}`}>
          {/* Contact Component */}
          <Contacts
            users={users}
            currentUser={currentUserWithMessage}
            setLayout={setLayout}
            setReceiver={setReceiver}
          />
        </section>

        {/* md보다 작고 layout이 false일 때는 chat 영역이 안 보이게 */}
        <section className={`md:flex ${!layout && "hidden"}`}>
          {/* Chat Component */}
          <Chat
            currentUser={currentUserWithMessage}
            receiver={receiver}
            setLayout={setLayout}
          />
        </section>
      </div>
    </main>
  );
};

export default ChatClient;

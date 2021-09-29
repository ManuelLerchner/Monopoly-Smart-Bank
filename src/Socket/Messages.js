import React, { useEffect, useState } from "react";

function Messages({ socket, listeningID }) {
    const [messages, setMessages] = useState({});

    useEffect(() => {
        const messageListener = (message) => {
            setMessages((prevMessages) => {
                const newMessages = { ...prevMessages };
                newMessages[message.id] = message;
                return newMessages;
            });
        };

        const deleteMessageListener = (messageID) => {
            setMessages((prevMessages) => {
                const newMessages = { ...prevMessages };
                delete newMessages[messageID];
                return newMessages;
            });
        };

        socket.on("message", messageListener);
        socket.on("deleteMessage", deleteMessageListener);
        socket.emit("getMessages", listeningID);

        return () => {
            socket.off("message", messageListener);
            socket.off("deleteMessage", deleteMessageListener);
        };
    }, [socket, listeningID]);

    return (
        <div className="message-list">
            {[...Object.values(messages)]
                .sort((a, b) => a.time - b.time)
                .map((message) => (
                    <div
                        key={message.id}
                        className="message-container"
                        title={`Sent at ${new Date(
                            message.time
                        ).toLocaleTimeString()}`}
                    >
                        {new Date(message.time).toLocaleTimeString() +
                            ", " +
                            message.value}
                    </div>
                ))}
        </div>
    );
}

export default Messages;

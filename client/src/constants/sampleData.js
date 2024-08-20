export const chats = [
    {
        avatar: [
            "https://www.w3schools.com/howto/img_avatar.png",
            "https://www.w3schools.com/howto/img_avatar2.png",
            "https://www.w3schools.com/howto/img_avatar.png",
            "https://www.w3schools.com/howto/img_avatar2.png",
            "https://www.w3schools.com/howto/img_avatar.png",
            "https://www.w3schools.com/howto/img_avatar2.png"
        ],
        name: "Tech Enthusiasts",
        _id: "1",
        groupChat: true,
        members: ["1", "2", "3", "4", "5", "6"]
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Wick",
        _id: "2",
        groupChat: false,
        members: ["1", "2"]
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
        name: "Jane Smith",
        _id: "3",
        groupChat: false,
        members: ["3", "4"]
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Developers Group",
        _id: "4",
        groupChat: true,
        members: ["1", "2", "5"]
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
        name: "Mike Johnson",
        _id: "5",
        groupChat: false,
        members: ["5", "6"]
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Music Lovers",
        _id: "6",
        groupChat: true,
        members: ["1", "2", "3", "4"]
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
        name: "Chris Brown",
        _id: "7",
        groupChat: false,
        members: ["4", "5"]
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Emily Davis",
        _id: "8",
        groupChat: false,
        members: ["6", "1"]
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
        name: "Family Group",
        _id: "9",
        groupChat: true,
        members: ["1", "2", "3", "4", "5"]
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Linda Wilson",
        _id: "10",
        groupChat: false,
        members: ["1", "4"]
    }
];

export const users = [
     {
         avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
         name: "John Doe",
         _id: "1",
     },{
         avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
         name: "Jane Smith",
         _id: "2",
     },{
         avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
         name: "Mike Johnson",
         _id: "3",
     },{
         avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
         name: "Emily Davis",
         _id: "4",
     },{
         avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
         name: "Chris Brown",
         _id: "5",
     },
 ];

export const notifications = [
    {
        _id: "1",
        sender: {
            name: "John Doe",
            avatar: "https://www.w3schools.com/howto/img_avatar.png"
        }
    },
    {
        _id: "2",
        sender: {
            name: "Jane Smith",
            avatar: "https://www.w3schools.com/howto/img_avatar2.png"
        }
    },
    {
        _id: "3",
        sender: {
            name: "Mike Johnson",
            avatar: "https://www.w3schools.com/howto/img_avatar.png"
        }
    },
    {
        _id: "4",
        sender: {
            name: "Emily Davis",
            avatar: "https://www.w3schools.com/howto/img_avatar2.png"
        }
    },
    {
        _id: "5",
        sender: {
            name: "Chris Brown",
            avatar: "https://www.w3schools.com/howto/img_avatar.png"
        }
    },
    {
        _id: "6",
        sender: {
            name: "Patricia Taylor",
            avatar: "https://www.w3schools.com/howto/img_avatar2.png"
        }
    },
    {
        _id: "7",
        sender: {
            name: "Robert Miller",
            avatar: "https://www.w3schools.com/howto/img_avatar.png"
        }
    },
    {
        _id: "8",
        sender: {
            name: "Linda Wilson",
            avatar: "https://www.w3schools.com/howto/img_avatar2.png"
        }
    },
    {
        _id: "9",
        sender: {
            name: "John Wick",
            avatar: "https://www.w3schools.com/howto/img_avatar.png"
        }
    },
    {
        _id: "10",
        sender: {
            name: "Emily Davis",
            avatar: "https://www.w3schools.com/howto/img_avatar2.png"
        }
    }
];

export const messages = [
    {
        content: "Hey, how are you?",
        _id: "msg1",
        sender: {
            _id: "1",
            name: "John Doe",
        },
        chat: "chatID1",
        createdAt: "2023-10-01T10:00:00.000Z",
        attachments: [],
    },
    {
        content: "I'm good, thanks! How about you?",
        _id: "msg2",
        sender: {
            _id: "2",
            name: "Jane Smith",
        },
        chat: "chatID1",
        createdAt: "2023-10-01T10:01:00.000Z",
        attachments: [],
    },
    {
        content: "Doing well, just working on a project.",
        _id: "msg3",
        sender: {
            _id: "1",
            name: "John Doe",
        },
        chat: "chatID1",
        createdAt: "2023-10-01T10:02:00.000Z",
        attachments: [
            {
                url: "https://www.w3schools.com/howto/img_avatar.png",
                public_id: "project_image_1",
            },
        ],
    },
    {
        content: "That sounds interesting. What project is it?",
        _id: "msg4",
        sender: {
            _id: "2",
            name: "Jane Smith",
        },
        chat: "chatID1",
        createdAt: "2023-10-01T10:03:00.000Z",
        attachments: [],
    },
    {
        content: "It's a chat application using React.",
        _id: "msg5",
        sender: {
            _id: "1",
            name: "John Doe",
        },
        chat: "chatID1",
        createdAt: "2023-10-01T10:04:00.000Z",
        attachments: [],
    },
    {
        content: "Nice! Let me know if you need any help.",
        _id: "msg6",
        sender: {
            _id: "2",
            name: "Jane Smith",
        },
        chat: "chatID1",
        createdAt: "2023-10-01T10:05:00.000Z",
        attachments: [
            {
                url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                public_id: "help_image_1",
            },
        ],
    },
    {
        content: "Will do, thanks!",
        _id: "msg7",
        sender: {
            _id: "1",
            name: "John Doe",
        },
        chat: "chatID1",
        createdAt: "2023-10-01T10:06:00.000Z",
        attachments: [],
    },
];
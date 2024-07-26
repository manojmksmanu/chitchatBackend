export const getSender = (loggedUser, users) => {
  if (users && loggedUser) {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  }
};
// export const getSender = (loggedUser, users) => {
//   if (!loggedUser || !Array.isArray(users) || users.length < 2) {
//     // Return null or handle the error as needed
//     return null;
//   }

//   // Ensure users have the expected properties and ids
//   const [user1, user2] = users;

//   if (user1._id === loggedUser._id) {
//     return user2;
//   }

//   return user1;
// };
export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};
export const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

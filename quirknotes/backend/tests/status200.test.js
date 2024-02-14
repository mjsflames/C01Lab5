const SERVER_URL = "http://localhost:4000";

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  // Code here
  const allNotes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
  const noteContent = await allNotes.json();

  expect(allNotes.status).toBe(200);
  expect(noteContent.response.length).toBe(0);
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  // Code here
  const firstTitle = "NoteTitleTest";
  const firstContent = "NoteTitleContent";

  const postFirstNote = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: firstTitle,
      content: firstContent,
    })
  })
  
  const postFirstBody = await postFirstNote.json();

  const secondTitle = "NoteTitleTest2";
  const secondContent = "NoteTitleContent2";

  const postSecondNote = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: secondTitle,
      content: secondContent,
    })
  })
  
  const postSecondBody = await postSecondNote.json();

  const getBothNotes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const getBothNoteBody = await getBothNotes.json();
  
  expect(getBothNotes.status).toBe(200);
  //expect(getBothNoteBody.response.length).toBe(2);

  await fetch(`${SERVER_URL}/deleteNote/${postFirstBody.inserteddId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })

  await fetch(`${SERVER_URL}/deleteNote/${postSecondBody.inserteddId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
});

test("/deleteNote - Delete a note", async () => {
  // Code here
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNote = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    })
  })

  const noteBody = await postNote.json();

  const deleteNote = await fetch(`${SERVER_URL}/deleteNote/${noteBody.insertedId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })

  expect(deleteNote.status).toBe(200);
});

test("/patchNote - Patch with content and title", async () => {
  // Code here
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNote = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    })
  })

  const postNoteBody = await postNote.json();

  const patchTitle = "PatchNoteTitleTest";
  const patchContent = "PatchNoteTitleContent";

  const patchNote = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: patchTitle,
      content: patchContent,
    })
  })

  expect(patchNote.status).toBe(200);

  await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
});

test("/patchNote - Patch with just title", async () => {
  // Code here
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNote = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    })
  })

  const postNoteBody = await postNote.json();

  const updateTitle = "UpdateNoteTitleTest";
  const patchNote = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: updateTitle,
    })
  })

  expect(patchNote.status).toBe(200);

  await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
});

test("/patchNote - Patch with just content", async () => {
  // Code here
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNote = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    })
  })

  const postNoteBody = await postNote.json();

  const updateContent = "UpdateNoteTitleContent";
  const patchNote = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: updateContent,
    })
  })

  expect(patchNote.status).toBe(200);
  
  await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
});

test("/deleteAllNotes - Delete one note", async () => {
  // Code here
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNote = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    })
  })

  const postNoteBody = await postNote.json();
  
  const deleteNotes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })

  expect(deleteNotes.status).toBe(200);
});

test("/deleteAllNotes - Delete three notes", async () => {
  // Code here
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postFirstNote = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    })
  })

  const postSecondNote = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    })
  })

  const postThirdNote = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    })
  })

  const postFirstBody = await postFirstNote.json();
  const postSecondBody = await postSecondNote.json();
  const postThirdBody = await postThirdNote.json();
  
  const deleteNotes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })

  //const deleteNoteBody = deleteNotes.json();
  expect(deleteNotes.status).toBe(200);
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  // Code here
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNote = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    })
  })

  const postNoteBody = await postNote.json();

  const updateNoteColour = await fetch(`${SERVER_URL}/updateNoteColor/${postNoteBody.insertedId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      color: "#FF0000",
    })
  })

  expect(updateNoteColour.status).toBe(200);

  await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
});
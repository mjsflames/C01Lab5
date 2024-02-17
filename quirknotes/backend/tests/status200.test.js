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
  await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
    },
  });

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
  await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const firstTitle = "NoteTitleTest";
  const firstContent = "NoteTitleContent";

  await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: firstTitle,
      content: firstContent,
    })
  })

  const secondTitle = "NoteTitleTest2";
  const secondContent = "NoteTitleContent2";

  await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: secondTitle,
      content: secondContent,
    })
  })

  const getBothNotes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const getBothNoteBody = await getBothNotes.json();
  
  expect(getBothNotes.status).toBe(200);
  expect(getBothNoteBody.response.length).toBe(2);
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

  const deleteNoteBody = await deleteNote.json();

  expect(deleteNote.status).toBe(200);
  expect(deleteNoteBody.response).toBe(`Document with ID ${noteBody.insertedId} deleted.`)
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

  const patchNoteBody = await patchNote.json();

  expect(patchNote.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} patched.`)

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

  const patchNoteBody = await patchNote.json();

  expect(patchNote.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} patched.`)

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

  const patchNoteBody = await patchNote.json();

  expect(patchNote.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} patched.`)
  
  await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
});

test("/deleteAllNotes - Delete one note", async () => {
  // Code here
  await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    })
  })

  //const postNoteBody = await postNote.json();
  
  const deleteNote = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const deleteNoteBody = await deleteNote.json();

  expect(deleteNote.status).toBe(200);
  expect(deleteNoteBody.response).toBe(`1 note(s) deleted.`);
});

test("/deleteAllNotes - Delete three notes", async () => {
  // Code here
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    })
  })

  const title2 = "NoteTitleTest2";
  const content2 = "NoteTitleContent2";

  await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title2,
      content: content2,
    })
  })

  const title3 = "NoteTitleTest3";
  const content3 = "NoteTitleContent3";

  await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title3,
      content: content3,
    })
  })
  
  const deleteNotes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const deleteNotesBody = await deleteNotes.json();

  expect(deleteNotes.status).toBe(200);
  expect(deleteNotesBody.response).toBe(`3 note(s) deleted.`);
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

  const updateNoteColorBody = await updateNoteColour.json();

  expect(updateNoteColour.status).toBe(200);
  expect(updateNoteColorBody.message).toBe(`Note color updated successfully.`);

  await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
});
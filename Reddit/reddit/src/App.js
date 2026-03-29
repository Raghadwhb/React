import React, { useState, useEffect } from "react";
import "./App.css";

function RedditFeed() {
  // 👤 user (محفوظ)
  const [activeUser, setActiveUser] = useState(() => {
    return localStorage.getItem("redditUser") || "";
  });

  // 👤 input مؤقت
  const [nameInput, setNameInput] = useState("");

  // 📝 posts
  const [postList, setPostList] = useState(() => {
    const saved = localStorage.getItem("myRedditPosts");
    return saved ? JSON.parse(saved) : [];
  });

  const [draftPost, setDraftPost] = useState("");

  // حفظ اليوزر
  useEffect(() => {
    if (activeUser) {
      localStorage.setItem("redditUser", activeUser);
    }
  }, [activeUser]);

  // حفظ البوستات
  useEffect(() => {
    localStorage.setItem("myRedditPosts", JSON.stringify(postList));
  }, [postList]);

  // ➕ إضافة بوست
  const addNewPost = () => {
    if (!draftPost.trim()) return;

    const newItem = {
      id: Date.now(),
      text: draftPost,
      author: activeUser,
      upvotes: 0
    };

    setPostList([newItem, ...postList]);
    setDraftPost("");
  };

  // ⬆️ upvote
  const increaseUpvote = (id) => {
    const updated = postList.map((item) =>
      item.id === id
        ? { ...item, upvotes: item.upvotes + 1 }
        : item
    );
    setPostList(updated);
  };

  // ترتيب
  const sortedPosts = [...postList].sort(
    (a, b) => b.upvotes - a.upvotes
  );

  // 🎯 إدخال اليوزر (ما ينتقل إلا بعد زر/Enter)
  if (!activeUser) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Enter your username</h2>

        <input
          type="text"
          placeholder="Your name..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (!nameInput.trim()) return;
              setActiveUser(nameInput);
            }
          }}
        />

        <button
          onClick={() => {
            if (!nameInput.trim()) return;
            setActiveUser(nameInput);
          }}
        >
          Enter
        </button>
      </div>
    );
  }

  return (
    <div className="reddit-container">
      <h1>Reddit Feed</h1>

      <p className="welcome-message">
        Welcome, {activeUser}
      </p>

      {/* 🔄 تغيير المستخدم */}
      <button
        onClick={() => {
          localStorage.removeItem("redditUser");
          setActiveUser("");
        }}
      >
        Change User
      </button>

      <div className="input-section">
        <fieldset>
          <legend>Post on Reddit</legend>
          <textarea
            value={draftPost}
            onChange={(e) => setDraftPost(e.target.value)}
          />
        </fieldset>

        <button className="post-button" onClick={addNewPost}>
          Post
        </button>
      </div>

      <div className="feed-section">
        {sortedPosts.length === 0 && <p>No posts yet.</p>}

        {sortedPosts.map((post) => (
          <div key={post.id} className="post-card">
            <p>{post.text}</p>

            <div className="post-footer">
              <span>
                <strong>
                  Uploader: {post.author} | {post.upvotes} upvotes
                </strong>
              </span>

              <button onClick={() => increaseUpvote(post.id)}>
                Upvote
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RedditFeed;
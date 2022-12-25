//import '../bootstrap-5.2.1/dist/css/bootstrap.min.css';
import '../scss/all.css';
import '../jquery.js';
import '../bootstrap-5.2.1/dist/js/bootstrap.min.js';
//import {Link} from "react-router-dom";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// Comments API
const API_ENDPOINT =
  "https://student-json-api.lidemy.me/comments?_sort=createdAt&_order=desc";

const Page = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  font-family: "monospace", "微軟正黑體";
  box-shadow: 0px 0px 16px rgb(199, 197, 197);
  border-radius: 8px;
  padding: 12px 28px;
  color: #6c6c6c;
  box-sizing: border-box;
`;

const Title = styled.h1`
  text-align: center;
`;

const MessageForm = styled.form`
  margin: 16px 0;
  font-size: 18px;
`;
const MessageLable = styled.div``;

const MessageTextArea = styled.textarea`
  display: block;
  margin-top: 8px;
  width: 95%;
  border-color: rgba(0, 0, 0, 0.125);
`;
const SubmitButton = styled.button`
  margin-top: 8px;
  color: #ddd;
  background-color: #343a40;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 16px;
  padding: 6px 12px;
`;

const MessageList = styled.div`
  margin-top: 16px;
`;
const MessageContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.125);
  padding: 16px;
  border-radius: 4px;

  & + & {
    margin-top: 8px;
  }
`;

const MessageHead = styled.div`
  display: flex;
  align-items: center;
`;

const MessageAuthor = styled.div`
  margin-right: 12px;
  color: #232323;
`;

const MessageTime = styled.div`
  margin-right: 12px;
`;

const MessageBody = styled.div`
  margin-top: 8px;
  word-break: break-all;
  white-space: pre-line;
`;

const ErrorMessage = styled.div`
  margin-top: 16px;
  color: #db4c3f;
`;

const MessageDeleteButton = styled.button`
  color: white;
  background-color: #db4c3f;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 16px;
  padding: 4px 8px;
`;

// 會遮住整個畫面
const Loading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 30px;
  // 垂直水平置中
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Message({ author, time, children, handleDeleteMessage, message }) {
  return (
    <MessageContainer>
      <MessageHead>
        <MessageAuthor>{author}</MessageAuthor>
        <MessageTime>{time}</MessageTime>
        <MessageDeleteButton
          onClick={() => {
            handleDeleteMessage(message.id);
          }}
        >
          刪除
        </MessageDeleteButton>
      </MessageHead>
      <MessageBody>{children}</MessageBody>
    </MessageContainer>
  );
}

Message.propTypes = {
  author: PropTypes.string,
  time: PropTypes.string,
  
  children: PropTypes.node,
  handleDeleteMessage: PropTypes.func,
  message: PropTypes.shape({
    id: PropTypes.number,
  }),
};

function App(props) {
  const [messages, setMessages] = useState(null);
  const [messageApiError, setMessageApiError] = useState(null);
  const [value, setValue] = useState();
  const [postMessageError, setPostMessageError] = useState();
  const [isLoadingPostMessage, setIsLoadingPostMessage] = useState(false);
  const [islogin, setIsLogin] = useState(false);

  const fetchMessages = () => {
    return fetch(API_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((err) => {
        setMessageApiError(err.message);
      });
  };

  const handleTextareaChange = (e) => {
    setValue(e.target.value);
  };

  const handleTextareaFocus = () => {
    setPostMessageError(null);
  };

  const handleFormSubmit = (e) => {
    // 阻止預設的表單發送行為
    e.preventDefault();
    // 若為 true 就直接返回
    if (isLoadingPostMessage) {
      return;
    }
    // 要發送 API 之前設成 true
    setIsLoadingPostMessage(true);
    fetch("https://student-json-api.lidemy.me/comments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        nickname: "Heidi",
        body: value,
      }),
    }).then((res) => res.json())
      .then((data) => {
        // 收到結果後設成 false
        setIsLoadingPostMessage(false);
        // 在顯示訊息前可進行錯誤處理
        if (data.ok === 0) {
          setPostMessageError(data.message);
          return;
        }
        setValue("");
        fetchMessages();
      })
      .catch((err) => {
        setIsLoadingPostMessage(false);
        setPostMessageError(err.message);
      });
  };

  const handleDeleteMessage = (id) => {
    fetch("https://student-json-api.lidemy.me/comments/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setMessages(messages.filter((message) => message.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 第二個參數傳入 [] 代表只在 componet mount 後執行
  useEffect(() => {
    fetchMessages();
    setIsLogin(props.islogin);
  }, []);
  console.log(props);
  return (
    <Page>
      {isLoadingPostMessage && <Loading>Loading...</Loading>}
      <Title>美食論壇</Title>
      <MessageForm onSubmit={handleFormSubmit}>
        <MessageLable>留言內容</MessageLable>
        <MessageTextArea
          value={value}
          onChange={handleTextareaChange}
          onFocus={handleTextareaFocus}
          rows={8}
        />
        <SubmitButton>送出</SubmitButton>
        {postMessageError && <ErrorMessage>{postMessageError}</ErrorMessage>}
      </MessageForm>
      {messageApiError && (
        <ErrorMessage>
          {/* 直接 render object 會出錯，因此需轉成 string */}
          Something went wrong. {messageApiError.toString()}
        </ErrorMessage>
      )}
      {/* 確認裡面有東西才會執行這一行 */}
      {messages && messages.length === 0 && <div>No Message</div>}
      <MessageList>
        {/* 確認裡面有東西才會執行這一行 */}
        {messages &&
          messages.map((message) => (
            <Message
              key={message.id}
              author={message.nickname}
              time={new Date(message.createdAt).toLocaleString()}
              handleDeleteMessage={handleDeleteMessage}
              message={message}
            >
              {message.body}
            </Message>
          ))}
      </MessageList>
    </Page>
  );
}

export default App;
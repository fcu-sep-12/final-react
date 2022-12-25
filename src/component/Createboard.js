import React, {useState, useEffect, useRef} from 'react';
//import {Link} from 'react-router-dom';
import '../bootstrap-5.2.1/dist/js/bootstrap.min.js';
import styled from "styled-components";
//import PropTypes from "prop-types";

const api="http://localhost:5000/";

const Page = styled.div`
  max-width: 800px;
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

// 表單區塊 form
const MessageForm = styled.form`
  margin-top: 16px;
  font-size: 18px;
`;
const MessageLable = styled.div`
  font-size: 24px;
`;

const MessageTextArea = styled.textarea`
  display: block;
  margin-top: 8px;
  width: 95%;
  border-color: rgba(0, 0, 0, 0.125);
`;

const MessageTextInput = styled.textarea`
  display: block;
  margin-top: 8px;
  width: 95%;
  height: 50px;
  border-color: rgba(0, 0, 0, 0.125);
`;
const SubmitButton = styled.button`
  margin-top: 20px;
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

const Createboard=(props)=>{
  const [messages, setMessages] = useState(null);
  const [messageApiError, setMessageApiError] = useState(null);
  const [value, setValue] = useState();
  const [inputvalue, setInputValue] = useState();
  const [postMessageError, setPostMessageError] = useState();
  const [postInputMessageError, setPostInputMessageError] = useState();
  const [isLoadingPostMessage, setIsLoadingPostMessage] = useState(false);


  const handleTextareaChange = (e) => {
    setValue(e.target.value);
  };

  const handleTextareaFocus = () => {
    setPostMessageError(null);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputFocus = () => {
    setPostInputMessageError(null);
  };

  const fetchMessages = () => {
    return fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((err) => {
        setMessageApiError(err.message);
      });
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
    return(
      <Page className="mt-5">
        <Title>創建新主題</Title>
        <MessageForm onSubmit={handleFormSubmit}>
          <MessageLable>主題</MessageLable>
          <MessageTextInput 
            value={inputvalue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            rows={8} />
          <MessageLable className="mt-3">留言內容</MessageLable>
          <MessageTextArea 
            value={value}
            onChange={handleTextareaChange}
            onFocus={handleTextareaFocus}
            rows={8} />
          <SubmitButton>送出</SubmitButton>
        </MessageForm>
      </Page>
    );
}
export default Createboard;
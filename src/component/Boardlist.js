import React, {useEffect, useState, useRef} from "react";
import styled from "styled-components";
//import PropTypes from "prop-types";

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

const MessageTextInput = styled.input`
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

function Boardlists({id, name, children}) {
    return (
      <MessageContainer>
        <MessageHead>
            <MessageAuthor>{id}</MessageAuthor>
            <MessageAuthor>{name}</MessageAuthor>
        </MessageHead>
        <MessageBody>{children}</MessageBody>
      </MessageContainer>
    );
}


const Boardlist=(props)=>{
    const [board, setBoard]=useState();
    const [errmessage, setErrMessage]=useState(null);
    const [loding,setLoding]=useState(true);

    



    useEffect(()=>{
        fetch("http://127.0.0.1:5000/api/boards/list").then(
            (response)=>response.json()
        ).then(
            (data)=>{
                if (data.success===1){
                    setLoding(false);
                    setBoard(data.board);
                    console.log(data);
                }
            }
        ).catch(err=>{
            setErrMessage(err);
            console.log(err);
        })

    },[])

    return(
        <>
        {(loding?(<Loading>Loading...</Loading>):
            <Page className="mt-5">
                <Title>留言板</Title>
                <MessageList>

                        <Boardlists
                            id={board.id}
                            name={board.name}
                        >
                    </Boardlists>
               
                </MessageList>
            </Page>
        )}
        </>
    )

}

export default Boardlist;
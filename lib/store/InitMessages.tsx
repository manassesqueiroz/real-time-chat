'use client'
import { useEffect, useRef } from "react";
import { IMessage, useMessage } from "./messages";
import { LIMIT_MESSAGE } from "../constant";

export default function InitMessages({messages}: {messages: IMessage[]}) {
  const initState = useRef(false)

  useEffect(()=> {
    const hasMore = messages.length >= LIMIT_MESSAGE
    if(!initState.current){
        useMessage.setState({messages, hasMore})
    }
    initState.current = true
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return <></>
}

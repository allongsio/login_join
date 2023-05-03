import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { addMembers } from '../api/members';
import Flx from '../components/Flx';
import Layout from '../components/Layout'
import Button from '../ele/Button';
import Input from '../ele/Input';

function Join() {
    const navigate = useNavigate();

    // Input값 임시저장소
    const [memberInfo, setMemberInfo] = useState({id: '', pw: '', pwf:''});
    // Input값 변경 시 state에 저장
    const inputAddHandler = (e) =>{
        console.log(memberInfo)
        setMemberInfo({...memberInfo, [e.target.name] : e.target.value})
    }
    // 리액트 쿼리 불러오기
    const queryClient = useQueryClient();

    // 쿼리 저장소 불러오기
    const {isLoading, isError, data} = useQuery("members", addMembers);

    const mutation = useMutation(addMembers,{
        onSuccess: () => {
            queryClient.invalidateQueries('members');
            console.log('성공')
        }
    });

    const submitJoinHandler = () => {
        let body = {
            id:memberInfo.id,
            password:memberInfo.pw
        }
        
        if(memberInfo.id.length > 5 || memberInfo.pw.length > 10 || memberInfo.pw !== memberInfo.pwf){
            alert('입력값을 확인해주세요')
        } else {
            mutation.mutate(body);
            alert('회원가입이 완료되었습니다.')
            navigate('/');
        }
    }
    

    return (
    <Layout>
        <Flx>
            <h1>Jogin</h1>
            <Button className='move' onClick={() => {navigate('/')}}>뒤로가기</Button>
        </Flx>
        <StForm onSubmit={submitJoinHandler}>
            <label htmlFor='id'>ID</label>
            {
                memberInfo.id.length > 5 ?
                <AlertMessage>아이디는 5자 이내로 작성해주세요</AlertMessage>
                :
                null
            }
            <Input type="text" name='id' value={memberInfo.id} onChange={inputAddHandler} placeholder="5자 이내로 입력하세요" />
            <label htmlFor='pw'>PW</label>
            {
                memberInfo.pw.length > 10 ?
                <AlertMessage>비밀번호는 10자 이내로 작성해주세요</AlertMessage>
                :
                null
            }
            <Input type="password" name='pw' value={memberInfo.pw} onChange={inputAddHandler} placeholder="5자 이내로 입력하세요" />
            <label htmlFor='pwf'>PW 확인하기</label>
            {
                memberInfo.pw === memberInfo.pwf ?
                null
                :
                <AlertMessage>비밀번호가 일치하지 않습니다.</AlertMessage>
            }
            <Input type="password" name='pwf' value={memberInfo.pwf} onChange={inputAddHandler} placeholder="비밀번호 확인을 위해 한번 더 입력해주세요" />
            <div className='btnwrap'>
                <Button type="submit">회원가입하기</Button>
            </div>
        </StForm>
    </Layout>
  )
}

export default Join

const StForm = styled.form`
    & > label{
        font-weight:500;
    }
    & > .btnwrap{
        margin-top:30px;
    }
`

const AlertMessage = styled.span`
    float:right;
    color:#f85151;
`
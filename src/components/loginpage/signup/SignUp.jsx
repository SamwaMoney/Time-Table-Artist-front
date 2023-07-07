import { S } from "./SignUp.style";

import { useState, useEffect } from "react";

const SignUp = () => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [pwCheck, setPwCheck] = useState('');
    const [isFilled, setIsFilled] = useState(false);
    const [isPwMatch, setIsPwMatch] = useState(true);
    useEffect(() => {
        if (id !== '' && pw !== '' && pwCheck !== '') setIsFilled(true);
    }, [id, pw, pwCheck]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFilled) {
            // 회원가입 api 불러오기
        }
    }

    const handlePwCheck = (e) => {
        setPwCheck(e.target.value);
        setIsPwMatch(pw === e.target.value);
    }

    return (
        <S.Wrapper>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="input">
                    <S.InputWrapper>
                        <div className="id-input">
                            <S.Text>ID</S.Text>
                            <S.InputBox
                                placeholder="아이디"
                                onChange={e => setId(e.target.value)}
                            />
                        </div>
                        <p className="text text-top">*영문, 숫자, 특수문자 입력 가능</p>
                        <p className="text text-bottom">아이디가 닉네임으로 활용됩니다.</p>
                    </S.InputWrapper>
                    <S.InputWrapper>
                        <div className="pw-input">
                            <S.Text>PW</S.Text>
                            <S.InputBox
                                placeholder="비밀번호 확인"
                                type="password"
                                onChange={e => setPw(e.target.value)}
                            />
                        </div>
                        <p className="text">*영문, 숫자, 특수문자 입력 가능</p>
                    </S.InputWrapper>
                    <S.InputWrapper>
                        <div className="pw-check-input">
                            <S.Text></S.Text>
                            <S.InputBox
                                placeholder="비밀번호 확인"
                                type="password"
                                onChange={e => handlePwCheck(e)}
                            />
                        </div>
                        <p className={`alert-text text ${isPwMatch ? 'hidden' : ''}`}>비밀번호가 일치하지 않습니다.</p>
                    </S.InputWrapper>
                </div>
                <S.SubmitBtn type="submit" disabled={!isFilled || !isPwMatch}>회원가입</S.SubmitBtn>
            </form>
        </S.Wrapper>
    );
}

export default SignUp;
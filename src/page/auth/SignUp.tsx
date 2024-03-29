import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ValidationErrorSvg } from '@svg/validation-error.svg';
import { useForm } from 'react-hook-form';
import { IEmailSignUpInputData, IJoinByEmailApiResponse } from 'types/Auth';
import { emailRegex } from '../../utils/index';
import useValidErrors from 'hooks/useValidErrors';
import { useApi } from 'hooks/useApi';
import { joinByEmail } from 'api/auth';
import useApiNavigation from 'hooks/useApiNavigation';
import { AuthSubmitButton, Input } from 'components/Auth';
import { Logo } from 'components/Common';

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<IEmailSignUpInputData>();

  const { execute, error } = useApi(joinByEmail);
  const apiNavigation = useApiNavigation<IJoinByEmailApiResponse>();

  const validError = useValidErrors(errors);

  const onValid = async (signUpInputData: IEmailSignUpInputData) => {
    const { email, nickName, password } = signUpInputData;

    const response = await execute({
      email: email,
      name: nickName,
      password: password,
    });

    if (response && !error) {
      if (response.error) {
        setError('email', { message: response.error });
      } else {
        apiNavigation('/signin', response);
      }
    }
  };

  return (
    <Auth>
      <Logo />
      <h2>이메일로 회원가입</h2>

      <AuthForm onSubmit={handleSubmit(onValid)}>
        <AuthFormLayout>
          <Input
            placeHolder="이메일 주소"
            label="이메일 주소"
            type="email"
            errors={errors.email?.message}
            register={register('email', {
              required: '이메일 ID를 입력해주세요.',
              pattern: {
                value: emailRegex,
                message: '올바른 이메일 형식이 아닙니다.',
              },
            })}
          />
          <PasswordInputContainer>
            <Input
              placeHolder="비밀번호"
              label="비밀번호"
              type="password"
              errors={errors.password?.message}
              register={register('password', {
                required: '비밀번호를 입력해주세요.',
              })}
            />

            <Input
              placeHolder="비밀번호 확인"
              type="password"
              errors={errors.password?.message}
              register={register('passwordCheck', {
                required: '비밀번호를 다시 한번 입력해주세요.',
                validate: {
                  matchesPreviousPassword: (value) => {
                    const { password } = getValues();
                    return (
                      password === value || '비밀번호가 일치하지 않습니다.'
                    );
                  },
                },
              })}
            >
              {(errors.email?.message ||
                errors.password?.message ||
                errors.passwordCheck?.message) && (
                <ErrorMessage>
                  <ValidationErrorSvg />
                  {errors.email?.message ||
                    errors.password?.message ||
                    errors.passwordCheck?.message}
                </ErrorMessage>
              )}
            </Input>
          </PasswordInputContainer>

          <Input
            type="nickName"
            label="닉네임"
            placeHolder="닉네임"
            register={register('nickName', {
              required: '닉네임을 입력해주세요.',
            })}
          >
            {errors.nickName?.message && (
              <ErrorMessage>
                <ValidationErrorSvg />
                {errors.nickName.message}
              </ErrorMessage>
            )}
          </Input>
        </AuthFormLayout>

        <AuthUtil>
          <AuthSubmitButton text="회원가입 완료" isError={validError} />
        </AuthUtil>
      </AuthForm>
    </Auth>
  );
}

export default SignUp;

const Auth = styled.section`
  margin-top: 24px;
  padding: 0 30px;

  & > h2 {
    font-size: 24px;
    font-weight: 700;
    margin-top: 25px;
  }

  & > p {
    margin-top: 22px;
    font-size: 14px;
    font-weight: 400;

    & a {
      margin-left: 15px;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;

const AuthForm = styled.form`
  width: 100%;
  padding: 22px 0 28px 0;
`;

const AuthFormLayout = styled.div`
  & > div:last-child {
    margin-top: 20px;
  }
`;

const ErrorMessage = styled.p`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.error};
  font-weight: 400;
  margin-top: 12px;

  & svg {
    margin-right: 7px;
  }
`;

const AuthUtil = styled.div`
  margin-top: 28px;
`;

const PasswordInputContainer = styled.div`
  margin-top: 20px;

  & > div + div {
    margin-top: 8px;
  }
`;

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}

blockquote, q {
	quotes: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}

table {
	border-collapse: collapse;
	border-spacing: 0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: inherit;
  font-family: 'Noto Sans KR', sans-serif;
  list-style: none;
  text-decoration: none;
  font-weight: inherit;
  letter-spacing: -0.025em;
  -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    -webkit-user-drag: none; 
}


body {
  font-weight: 700;
  background-color: ${({ theme }) => theme.colors.gray1};
  color:  ${({ theme }) => theme.colors.white};
}

fieldset,
input {
  border: none;
}

button {
  border: none;
  background: none;
  cursor: pointer;
}

.skip {
  position: absolute;
  width: 100%;
  line-height: 48px;
  height: 48px;
  background-color:  ${({ theme }) => theme.colors.main};
  top: -48px;
  transition: top 0.5s;
  text-align: center;
  color: #fff;
}

.skip:focus {
  top: 0px;
}

/* 대체텍스트 IR (SO 기법) */
.ir_so {
  overflow: hidden;
  position: absolute;
  width: 0;
  height: 0;
  line-height: 0;
  text-indent: -9999px;
}



`;

export default GlobalStyle;

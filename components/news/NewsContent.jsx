import styled from "styled-components";
import { View, Text, Title } from "components";

const NewsContent = styled(View)`

background-color: #fff;
   
    display: flex;
    flex-direction: column;
    border: 1px solid #dedede;
     border-right: none;
    padding: 27px 25px 28px;
    transition: all 250ms linear 0ms;
    height:150px;
     
    ${Text} {
        margin:10px 0px;
    }

    ${Title} {
        font-weight:500;
    }
`

export default NewsContent;

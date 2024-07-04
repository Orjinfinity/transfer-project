import styled from "styled-components";
import { View } from "components";

import NewsContent from "./NewsContent";
import NewsImage from "./NewsImage";
import NewsLink from "./NewsLink";
import NewsDate from "./NewsDate";

const News = styled(View)`
transition: all 300ms linear 0ms;
    position: relative;

    &::before {
        content: "";
        display: block;
        height: 10px;
        background-color: #dedede;
        position: absolute;
        bottom: -9px;
        left: 10px;
        right: -1px;
      
        clip-path: polygon(0 0,100% 0,100% 100%,6px 100%);
        transition: all 350ms ease-in-out 0ms;
    }
    }

    &::after {
        content: "";
        display: block;
        width: 10px;
        background-color: #dedede;
        position: absolute;
        top: 15px;
        bottom: -9px;
        right: -10px;
        transition: all 350ms ease-in-out 0ms;
    }

    &:hover {
        &::before {
            content: "";
            display: block;
            height: 10px;
            background-color: #e0c47d;
            position: absolute;
            bottom: -9px;
            left: 10px;
            right: -1px;
          
            clip-path: polygon(0 0,100% 0,100% 100%,6px 100%);
            transition: all 350ms ease-in-out 0ms;
        }

        &::after {
            content: "";
            display: block;
            width: 10px;
            background-color:#e0c47d;
            position: absolute;
            top: 15px;
            bottom: -9px;
            right: -10px;
            transition: all 350ms ease-in-out 0ms;
        }
    }

`;

News.Image = NewsImage;
News.Content = NewsContent;
News.Link = NewsLink;
News.Date = NewsDate;

export default News;

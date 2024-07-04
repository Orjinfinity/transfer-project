import styled from "styled-components";
import { Image } from "components";

const NewsImage = styled(Image)`
    width:100%;
    &::after {
        content: "";
    display: block;
    width: 75px;
    height: 15px;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    right: -1px;
    clip-path: polygon(12px 0,75px 0,75px 15px,0 15px);
    }
`

export default NewsImage;

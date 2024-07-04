import styled from "styled-components";
import { View, Text, Title, Link } from "components";

import ServiceContent from "./ServiceContent";
import ServiceImage from "./ServiceImage";
import { ServiceLink, StyledServiceLink } from "./ServiceLink";

const Service = styled.div`
  position: relative;
  margin-bottom: 20px;
  border-radius: 0;
  display: inline-block;

  &:hover {
    ${ServiceContent} {
      background-color: #e0c47d;
      color: #fff;
    }
    ${ServiceImage} {
      opacity: 0.9;
      transition: 0.3s cubic-bezier(0.24, 0.74, 0.58, 1);
      transform: scale3d(1.05, 1.05, 1);
    }
    ${Title} {
      color: #fff;
    }

    ${Text} {
      color: #fff;
    }

    ${StyledServiceLink} {
      background-color: white;
      color: #000;
    }
  }
`;
Service.Content = ServiceContent;
Service.Link = ServiceLink;
Service.Image = ServiceImage;

export default Service;

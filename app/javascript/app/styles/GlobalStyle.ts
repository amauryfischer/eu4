import { createGlobalStyle, css } from "styled-components"

const GlobalStyle = createGlobalStyle`
  :root {
    // blue 
    --blue100: rgb(191, 216, 252);
    --blue200: rgb(152, 213, 253);
    --blue300: rgb(100, 184, 251);
    --blue400: rgb(61, 156, 247);
    --blue500: rgb(0, 112, 243);
    --blue600: rgb(0, 86, 208);
    --blue700: rgb(0, 64, 174);
    --blue800: rgb(0, 45, 140);
    --blue900: rgb(0, 32, 116);

    --blue100-rgb: 191, 216, 252;
    --blue200-rgb: 152, 213, 253;
    --blue300-rgb: 100, 184, 251;
    --blue400-rgb: 61, 156, 247;
    --blue500-rgb: 0, 112, 243;
    --blue600-rgb: 0, 86, 208;
    --blue700-rgb: 0, 64, 174;
    --blue800-rgb: 0, 45, 140;
    --blue900-rgb: 0, 32, 116;

    // purple
    --purple100: rgb(219, 200, 240);
    --purple200: rgb(221, 169, 249);
    --purple300: rgb(193, 124, 239);
    --purple400: rgb(162, 88, 223);
    --purple500: rgb(121, 40, 202);
    --purple600: rgb(94, 29, 173);
    --purple700: rgb(70, 20, 145);
    --purple800: rgb(49, 12, 117);
    --purple900: rgb(34, 7, 96);

    --purple100-rgb: 219, 200, 240;
    --purple200-rgb: 221, 169, 249;
    --purple300-rgb: 193, 124, 239;
    --purple400-rgb: 162, 88, 223;
    --purple500-rgb: 121, 40, 202;
    --purple600-rgb: 94, 29, 173;
    --purple700-rgb: 70, 20, 145;
    --purple800-rgb: 49, 12, 117;
    --purple900-rgb: 34, 7, 96;

    // green
    --green100: rgb(197, 240, 213);
    --green200: rgb(161, 249, 172);
    --green300: rgb(111, 238, 141);
    --green400: rgb(74, 222, 123);
    --green500: rgb(23, 201, 100);
    --green600: rgb(16, 172, 99);
    --green700: rgb(11, 144, 95);
    --green800: rgb(7, 116, 87);
    --green900: rgb(4, 96, 80);

    --green100-rgb: 197, 240, 213;
    --green200-rgb: 161, 249, 172;
    --green300-rgb: 111, 238, 141;
    --green400-rgb: 74, 222, 123;
    --green500-rgb: 23, 201, 100;
    --green600-rgb: 16, 172, 99;
    --green700-rgb: 11, 144, 95;
    --green800-rgb: 7, 116, 87;
    --green900-rgb: 4, 96, 80;

    // yellow
    --yellow100: rgb(252, 230, 199);
    --yellow200: rgb(254, 231, 166);
    --yellow300: rgb(252, 213, 122);
    --yellow400: rgb(249, 194, 88);
    --yellow500: rgb(245, 166, 35);
    --yellow600: rgb(210, 133, 25);
    --yellow700: rgb(176, 104, 17);
    --yellow800: rgb(142, 77, 11);
    --yellow900: rgb(117, 58, 6);

    --yellow100-rgb: 252, 230, 199;
    --yellow200-rgb: 254, 231, 166;
    --yellow300-rgb: 252, 213, 122;
    --yellow400-rgb: 249, 194, 88;
    --yellow500-rgb: 245, 166, 35;
    --yellow600-rgb: 210, 133, 25;
    --yellow700-rgb: 176, 104, 17;
    --yellow800-rgb: 142, 77, 11;
    --yellow900-rgb: 117, 58, 6;

    // red
    --red100: rgb(251, 196, 213);
    --red200: rgb(253, 160, 165);
    --red300: rgb(251, 112, 133);
    --red400: rgb(247, 76, 119);
    --red500: rgb(242, 19, 97);
    --red600: rgb(208, 13, 101);
    --red700: rgb(174, 9, 99);
    --red800: rgb(140, 6, 92);
    --red900: rgb(116, 3, 87);

    --red100-rgb: 251, 196, 213;
    --red200-rgb: 253, 160, 165;
    --red300-rgb: 251, 112, 133;
    --red400-rgb: 247, 76, 119;
    --red500-rgb: 242, 19, 97;
    --red600-rgb: 208, 13, 101;
    --red700-rgb: 174, 9, 99;
    --red800-rgb: 140, 6, 92;
    --red900-rgb: 116, 3, 87;

    // cyan
    --cyan100: rgb(238, 255, 244);
    --cyan200: rgb(221, 255, 237);
    --cyan300: rgb(204, 255, 233);
    --cyan400: rgb(191, 255, 234);
    --cyan500: rgb(170, 255, 236);
    --cyan600: rgb(124, 219, 207);
    --cyan700: rgb(85, 183, 180);
    --cyan800: rgb(54, 141, 147);
    --cyan900: rgb(32, 108, 122);

    --cyan100-rgb: 238, 255, 244;
    --cyan200-rgb: 221, 255, 237;
    --cyan300-rgb: 204, 255, 233;
    --cyan400-rgb: 191, 255, 234;
    --cyan500-rgb: 170, 255, 236;
    --cyan600-rgb: 124, 219, 207;
    --cyan700-rgb: 85, 183, 180;
    --cyan800-rgb: 54, 141, 147;
    --cyan900-rgb: 32, 108, 122;

    // pink
    --pink100: rgb(255, 219, 231);
    --pink200: rgb(255, 184, 214);
    --pink300: rgb(255, 148, 204);
    --pink400: rgb(255, 122, 204);
    --pink500: rgb(255, 78, 205);
    --pink600: rgb(219, 57, 189);
    --pink700: rgb(183, 39, 170);
    --pink800: rgb(146, 24, 147);
    --pink900: rgb(110, 14, 122);

    --pink100-rgb: 255, 219, 231;
    --pink200-rgb: 255, 184, 214;
    --pink300-rgb: 255, 148, 204;
    --pink400-rgb: 255, 122, 204;
    --pink500-rgb: 255, 78, 205;
    --pink600-rgb: 219, 57, 189;
    --pink700-rgb: 183, 39, 170;
    --pink800-rgb: 146, 24, 147;
    --pink900-rgb: 110, 14, 122;

    // grey
    --grey100: rgb(244, 244, 244);
    --grey200: rgb(234, 234, 234);
    --grey300: rgb(193, 193, 193);
    --grey400: rgb(153, 153, 153);
    --grey500: rgb(136, 136, 136);
    --grey600: rgb(102, 102, 102);
    --grey700: rgb(68, 68, 68);
    --grey800: rgb(51, 51, 51);
    --grey900: rgb(17, 17, 17);

    --grey100-rgb: 244, 244, 244;
    --grey200-rgb: 234, 234, 234;
    --grey300-rgb: 193, 193, 193;
    --grey400-rgb: 153, 153, 153;
    --grey500-rgb: 136, 136, 136;
    --grey600-rgb: 102, 102, 102;
    --grey700-rgb: 68, 68, 68;
    --grey800-rgb: 51, 51, 51;
    --grey900-rgb: 17, 17, 17;
  }

  body {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: white;
    background-color: black;
    margin: 0;
  }
  a {
    text-decoration: unset !important;
  }
`
export default GlobalStyle

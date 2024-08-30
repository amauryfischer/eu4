import { css } from "styled-components"

const color_theme = css`
  //   ██████  ██████  ██ ███    ███  █████  ██████  ██    ██ 
  // ██   ██ ██   ██ ██ ████  ████ ██   ██ ██   ██  ██  ██  
  // ██████  ██████  ██ ██ ████ ██ ███████ ██████    ████   
  // ██      ██   ██ ██ ██  ██  ██ ██   ██ ██   ██    ██    
  // ██      ██   ██ ██ ██      ██ ██   ██ ██   ██    ██    

  --primary: var(--caramel);
  --primary-hue: var(--caramel-hue);
  --primary-saturation: var(--caramel-saturation);
  --primary-lightness: var(--caramel-lightness);
  --primary-text-color: var(--caramel-text-color);
  --primary50: var(--caramel50);
  --primary50-lightness: var(--caramel50-lightness);
  --primary100: var(--caramel100);
  --primary100-lightness: var(--caramel100-lightness);
  --primary200: var(--caramel200);
  --primary200-lightness: var(--caramel200-lightness);
  --primary300: var(--caramel300);
  --primary300-lightness: var(--caramel300-lightness);
  --primary400: var(--caramel400);
  --primary400-lightness: var(--caramel400-lightness);
  --primary500: var(--caramel500);
  --primary500-lightness: var(--caramel500-lightness);
  --primary600: var(--caramel600);
  --primary600-lightness: var(--caramel600-lightness);
  --primary700: var(--caramel700);
  --primary700-lightness: var(--caramel700-lightness);
  --primary800: var(--caramel800);
  --primary800-lightness: var(--caramel800-lightness);
  --primary900: var(--caramel900);
  --primary900-lightness: var(--caramel900-lightness);

// 
//   ███████ ███████  ██████  ██████  ███    ██ ██████   █████  ██████  ██    ██ 
// ██      ██      ██      ██    ██ ████   ██ ██   ██ ██   ██ ██   ██  ██  ██  
// ███████ █████   ██      ██    ██ ██ ██  ██ ██   ██ ███████ ██████    ████   
//      ██ ██      ██      ██    ██ ██  ██ ██ ██   ██ ██   ██ ██   ██    ██    
// ███████ ███████  ██████  ██████  ██   ████ ██████  ██   ██ ██   ██    ██    
//                                                                             

    --secondary: var(--blue);
    --secondary-hue: var(--blue-hue);
    --secondary-saturation: var(--blue-saturation);
    --secondary-lightness: var(--blue-lightness);
    --secondary-text-color: var(--blue-text-color);
    --secondary50: var(--blue50);
    --secondary50-lightness: var(--blue50-lightness);
    --secondary100: var(--blue100);
    --secondary100-lightness: var(--blue100-lightness);
    --secondary200: var(--blue200);
    --secondary200-lightness: var(--blue200-lightness);
    --secondary300: var(--blue300);
    --secondary300-lightness: var(--blue300-lightness);
    --secondary400: var(--blue400);
    --secondary400-lightness: var(--blue400-lightness);
    --secondary500: var(--blue500);
    --secondary500-lightness: var(--blue500-lightness);
    --secondary600: var(--blue600);
    --secondary600-lightness: var(--blue600-lightness);
    --secondary700: var(--blue700);
    --secondary700-lightness: var(--blue700-lightness);
    --secondary800: var(--blue800);
    --secondary800-lightness: var(--blue800-lightness);
    --secondary900: var(--blue900);
    --secondary900-lightness: var(--blue900-lightness);

//                                                                             
// ███    ██ ███████ ██    ██ ████████ ██████   █████  ██      
// ████   ██ ██      ██    ██    ██    ██   ██ ██   ██ ██      
// ██ ██  ██ █████   ██    ██    ██    ██████  ███████ ██      
// ██  ██ ██ ██      ██    ██    ██    ██   ██ ██   ██ ██      
// ██   ████ ███████  ██████     ██    ██   ██ ██   ██ ███████ 
//                                                             

    --neutral: var(--grey);
    --neutral-hue: var(--grey-hue);
    --neutral-saturation: var(--grey-saturation);
    --neutral-lightness: var(--grey-lightness);
    --neutral-text-color: var(--grey-text-color);
    --neutral50: var(--grey50);
    --neutral50-lightness: var(--grey50-lightness);
    --neutral100: var(--grey100);
    --neutral100-lightness: var(--grey100-lightness);
    --neutral200: var(--grey200);
    --neutral200-lightness: var(--grey200-lightness);
    --neutral300: var(--grey300);
    --neutral300-lightness: var(--grey300-lightness);
    --neutral400: var(--grey400);
    --neutral400-lightness: var(--grey400-lightness);
    --neutral500: var(--grey500);
    --neutral500-lightness: var(--grey500-lightness);
    --neutral600: var(--grey600);
    --neutral600-lightness: var(--grey600-lightness);
    --neutral700: var(--grey700);
    --neutral700-lightness: var(--grey700-lightness);
    --neutral800: var(--grey800);
    --neutral800-lightness: var(--grey800-lightness);
    --neutral900: var(--grey900);
    --neutral900-lightness: var(--grey900-lightness);

//                                                             
// ██ ███    ██ ███████  ██████  
// ██ ████   ██ ██      ██    ██ 
// ██ ██ ██  ██ █████   ██    ██ 
// ██ ██  ██ ██ ██      ██    ██ 
// ██ ██   ████ ██       ██████  
//                               

    --info: var(--blue);
    --info-hue: var(--blue-hue);
    --info-saturation: var(--blue-saturation);
    --info-lightness: var(--blue-lightness);
    --info-text-color: var(--blue-text-color);
    --info50: var(--blue50);
    --info50-lightness: var(--blue50-lightness);
    --info100: var(--blue100);
    --info100-lightness: var(--blue100-lightness);
    --info200: var(--blue200);
    --info200-lightness: var(--blue200-lightness);
    --info300: var(--blue300);
    --info300-lightness: var(--blue300-lightness);
    --info400: var(--blue400);
    --info400-lightness: var(--blue400-lightness);
    --info500: var(--blue500);
    --info500-lightness: var(--blue500-lightness);
    --info600: var(--blue600);
    --info600-lightness: var(--blue600-lightness);
    --info700: var(--blue700);
    --info700-lightness: var(--blue700-lightness);
    --info800: var(--blue800);
    --info800-lightness: var(--blue800-lightness);
    --info900: var(--blue900);
    --info900-lightness: var(--blue900-lightness);

//                               
// ███████ ██    ██  ██████  ██████ ███████ ███████ ███████ 
// ██      ██    ██ ██      ██      ██      ██      ██      
// ███████ ██    ██ ██      ██      █████   ███████ ███████ 
//      ██ ██    ██ ██      ██      ██           ██      ██ 
// ███████  ██████   ██████  ██████ ███████ ███████ ███████ 
//         

    --success: var(--green);
    --success-hue: var(--green-hue);
    --success-saturation: var(--green-saturation);
    --success-lightness: var(--green-lightness);
    --success-text-color: var(--green-text-color);
    --success50: var(--green50);
    --success50-lightness: var(--green50-lightness);
    --success100: var(--green100);
    --success100-lightness: var(--green100-lightness);
    --success200: var(--green200);
    --success200-lightness: var(--green200-lightness);
    --success300: var(--green300);
    --success300-lightness: var(--green300-lightness);
    --success400: var(--green400);
    --success400-lightness: var(--green400-lightness);
    --success500: var(--green500);
    --success500-lightness: var(--green500-lightness);
    --success600: var(--green600);
    --success600-lightness: var(--green600-lightness);
    --success700: var(--green700);
    --success700-lightness: var(--green700-lightness);
    --success800: var(--green800);
    --success800-lightness: var(--green800-lightness);
    --success900: var(--green900);
    --success900-lightness: var(--green900-lightness);

    
                                                         
// ██     ██  █████  ██████  ███    ██ ██ ███    ██  ██████  
// ██     ██ ██   ██ ██   ██ ████   ██ ██ ████   ██ ██       
// ██  █  ██ ███████ ██████  ██ ██  ██ ██ ██ ██  ██ ██   ███ 
// ██ ███ ██ ██   ██ ██   ██ ██  ██ ██ ██ ██  ██ ██ ██    ██ 
//  ███ ███  ██   ██ ██   ██ ██   ████ ██ ██   ████  ██████  
//                                                           
                               
    --warning: var(--yellow);
    --warning-hue: var(--yellow-hue);
    --warning-saturation: var(--yellow-saturation);
    --warning-lightness: var(--yellow-lightness);
    --warning-text-color: var(--yellow-text-color);
    --warning50: var(--yellow50);
    --warning50-lightness: var(--yellow50-lightness);
    --warning100: var(--yellow100);
    --warning100-lightness: var(--yellow100-lightness);
    --warning200: var(--yellow200);
    --warning200-lightness: var(--yellow200-lightness);
    --warning300: var(--yellow300);
    --warning300-lightness: var(--yellow300-lightness);
    --warning400: var(--yellow400);
    --warning400-lightness: var(--yellow400-lightness);
    --warning500: var(--yellow500);
    --warning500-lightness: var(--yellow500-lightness);
    --warning600: var(--yellow600);
    --warning600-lightness: var(--yellow600-lightness);
    --warning700: var(--yellow700);
    --warning700-lightness: var(--yellow700-lightness);
    --warning800: var(--yellow800);
    --warning800-lightness: var(--yellow800-lightness);
    --warning900: var(--yellow900);
    --warning900-lightness: var(--yellow900-lightness);


// Error

    --error: var(--red);
    --error-hue: var(--red-hue);
    --error-saturation: var(--red-saturation);
    --error-lightness: var(--red-lightness);
    --error-text-color: var(--red-text-color);
    --error50: var(--red50);
    --error50-lightness: var(--red50-lightness);
    --error100: var(--red100);
    --error100-lightness: var(--red100-lightness);
    --error200: var(--red200);
    --error200-lightness: var(--red200-lightness);
    --error300: var(--red300);
    --error300-lightness: var(--red300-lightness);
    --error400: var(--red400);
    --error400-lightness: var(--red400-lightness);
    --error500: var(--red500);
    --error500-lightness: var(--red500-lightness);
    --error600: var(--red600);
    --error600-lightness: var(--red600-lightness);
    --error700: var(--red700);
    --error700-lightness: var(--red700-lightness);
    --error800: var(--red800);
    --error800-lightness: var(--red800-lightness);
    --error900: var(--red900);
    --error900-lightness: var(--red900-lightness);
    
`

export default color_theme

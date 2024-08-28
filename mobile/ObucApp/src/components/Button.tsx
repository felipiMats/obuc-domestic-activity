import { Text, TouchableOpacity, ButtonProps, ActivityIndicator } from 'react-native';
import { CaretRight } from 'phosphor-react-native';

type ButtonProp = ButtonProps & {
    title: string;
    next?: any;
    bg: 'off' | 'on' | 'on-gray';
    width?: string;
    loading?: boolean;
}

export function Button({title, bg, width, next, loading, ...rest}: ButtonProp) {
  let background;
  let text;
  let disabled = false;
  let iconColor;

  if (bg === 'off' || loading){
    background = 'bg-[#F4F4F4]';
    text = 'text-[#BEBEBE]';
    iconColor = "#BEBEBE"
    disabled = true;
  } else if (bg === 'on') {
    background = 'bg-[#DBF4A6]';
    text = 'text-[#1B1140]';
    iconColor = "#1B1140"
  } else {
    background = 'bg-[#F4F4F4]';
    text = 'text-[#1B1140]';
    iconColor = "#1B1140"
  }

  return(
    <TouchableOpacity disabled={disabled} className={`flex flex-row items-center h-11 ${width ? `w-${width}` : "w-32"} justify-center rounded-3xl ${background}`} {...rest}>
      <Text className={`text-center leading-relaxed text-base ${width ? "text-sm" : "text-base"} ${text} font-outfitSemiBold`}>
        {loading ? <ActivityIndicator size={20} color={'#BEBEBE'} /> : title}
      </Text>
      {next && !loading && <CaretRight style={{marginTop: 3}} weight='bold' color={iconColor} size={16} />}
    </TouchableOpacity>
  )
}
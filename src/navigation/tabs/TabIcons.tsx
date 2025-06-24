import {
  UserIcon,
  MapPinIcon,
  HomeIcon,
  Square3Stack3DIcon,
  PlusIcon,
} from "react-native-heroicons/outline";
import {
  UserIcon as UserIconSolid,
  MapPinIcon as MapPinIconSolid,
  HomeIcon as HomeIconSolid,
  Square3Stack3DIcon as Square3Stack3DIconSolid,
} from "react-native-heroicons/solid";
import { View } from "react-native";
import { colors } from "../../utils/styles";
import { SvgXml } from "react-native-svg";

type TabIconsProps = {
  name: string;
  size: number;
  focused: boolean;
};

const MyIconSolid = ({ color = "black", size = 24 }) => {
  const svgCode = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg">
<path d="M9 18L19 21" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M9 15L19 18" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M9 3L19 18" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M2 5L9 15" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M14 4L22 16" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M14 4L9 3" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M2 5L9 3" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M9 15V18" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M19 18V21" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M22 19L19 21" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M22 16L19 18" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M22 16V19" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M3 5L10 15" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M4 5L11 15" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M5 5L12 15" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M6 5L14 16" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M7 5L15 16" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M7 4L16 17" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M8 4L17 17" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<g filter="url(#filter0_d_17_51)">
<path d="M6 7H6.03125" stroke="white" stroke-width="2" stroke-linecap="round"/>
</g>
<path d="M10 8H10.0312" stroke="white" stroke-width="2" stroke-linecap="round"/>
<path d="M14 14H14.0312" stroke="white" stroke-width="2" stroke-linecap="round"/>
<path d="M10 12H10.0312" stroke="white" stroke-width="2" stroke-linecap="round"/>
<defs>
<filter id="filter0_d_17_51" x="1" y="6" width="10.0312" height="10" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_17_51"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_17_51" result="shape"/>
</filter>
</defs>
</svg>`;

  return <SvgXml xml={svgCode} />;
};
const MyIconOutline = ({ color = "black", size = 24 }) => {
  const svgCode = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg">
<path d="M9 18L19 21" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M9 15L19 18" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M9 3L19 18" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M2 5L9 15" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M14 4L22 16" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M14 4L9 3" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M2 5L9 3" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M9 15V18" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M19 18V21" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M22 19L19 21" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M22 16L19 18" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
<path d="M22 16V19" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

  return <SvgXml xml={svgCode} />;
};

const TabIcons: React.FC<TabIconsProps> = ({ name, size, focused }) => {
  let iconSource;

  switch (name) {
    case "HomeStack":
      iconSource = focused ? (
        // <HomeIconSolid size={size} color={"black"} />
        <MyIconSolid size={size} color="black" />
      ) : (
        <MyIconOutline size={size} color={"black"} />
      );
      break;
    case "GymStack":
      iconSource = focused ? (
        <HomeIconSolid size={size} color={"black"} />
      ) : (
        <HomeIcon size={size} color={"black"} />
      );
      break;
    case "AddBoulder":
      iconSource = (
        <View
          style={{
            borderRadius: 100,
            borderWidth: 1,
            borderColor: colors.primary,
            backgroundColor: colors.primaryLight,
            padding: 8,
            marginTop: 15,
          }}
        >
          <PlusIcon size={size} color={colors.primary} />
        </View>
      );
      break;
    case "MapStack":
      iconSource = focused ? (
        <MapPinIconSolid size={size} color={"black"} />
      ) : (
        <MapPinIcon size={size} color={"black"} />
      );
      break;
    case "ProfileStack":
      iconSource = focused ? (
        <UserIconSolid size={size} color={"black"} />
      ) : (
        <UserIcon size={size} color={"black"} />
      );
      break;
  }

  return iconSource;
};

export default TabIcons;

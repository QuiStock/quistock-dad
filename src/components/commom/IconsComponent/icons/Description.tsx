import { type IIconSize } from "@/components/commom/IconsComponent/icons/types";

const Description = ({ size = "big" }: IIconSize) => {
  const big = (
    <svg
      width="324"
      height="324"
      viewBox="0 0 324 324"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M205.476 37.7422V1.54688H2V285.352H45.0394" fill="#FAFAFA" />
      <path
        d="M205.476 37.7422V1.54688H2V285.352H45.0394"
        stroke="#232378"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <path
        d="M241.671 186.053V37.7422H105.675L45.0393 98.3776V321.547H241.671V235.925"
        fill="white"
      />
      <path
        d="M241.671 186.053V37.7422H105.675L45.0393 98.3776V321.547H241.671V235.925"
        stroke="#232378"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <path
        d="M105.675 37.7422V98.3776H45.0393"
        stroke="#232378"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M184.785 292.812L320.087 157.51C322.637 154.96 322.637 150.824 320.087 148.274L304.386 132.573C301.836 130.023 297.701 130.023 295.151 132.573L159.848 267.876V292.812H184.785Z"
        fill="#FAFAFA"
        stroke="#232378"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M270.675 206.921L245.739 181.985"
        stroke="#232378"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M301.245 176.351L276.309 151.415"
        stroke="#232378"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M96 171.547H190.268"
        stroke="#C3EBFA"
        strokeWidth="6"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M96 139.547H190.268"
        stroke="#C3EBFA"
        strokeWidth="6"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M96 203.547H190.268"
        stroke="#C3EBFA"
        strokeWidth="6"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M96 235.547H143.133"
        stroke="#C3EBFA"
        strokeWidth="6"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const small = (
    <svg
      width="162"
      height="163"
      viewBox="0 0 162 163"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M102.738 19.6445V1.54688H1V143.449H22.5197" fill="#FAFAFA" />
      <path
        d="M102.738 19.6445V1.54688H1V143.449H22.5197"
        stroke="#232378"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <path
        d="M120.835 93.8V19.6445H52.8373L22.5195 49.9623V161.547H120.835V118.736"
        fill="white"
      />
      <path
        d="M120.835 93.8V19.6445H52.8373L22.5195 49.9623V161.547H120.835V118.736"
        stroke="#232378"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <path
        d="M52.8375 19.6445V49.9623H22.5198"
        stroke="#232378"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M92.3923 147.18L160.044 79.5286C161.319 78.2535 161.319 76.1859 160.044 74.9108L152.193 67.0603C150.918 65.7852 148.85 65.7852 147.575 67.0603L79.9241 134.712V147.18H92.3923Z"
        fill="#FAFAFA"
        stroke="#232378"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M135.338 104.234L122.869 91.7661"
        stroke="#232378"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M150.623 88.9489L138.155 76.481"
        stroke="#232378"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M48 86.5469H95.1338"
        stroke="#C3EBFA"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M48 70.5469H95.1338"
        stroke="#C3EBFA"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M48 102.547H95.1338"
        stroke="#C3EBFA"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M48 118.547H71.5667"
        stroke="#C3EBFA"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return size === "small" ? small : big;
};

export default Description;

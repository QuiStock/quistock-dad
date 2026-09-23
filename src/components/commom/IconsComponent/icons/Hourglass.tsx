import { type IIconSize } from '@/components/commom/IconsComponent/icons/types'

const Hourglass = ({ size = 'big' }: IIconSize) => {
  const big = (
    <svg
      width="320"
      height="321"
      viewBox="0 0 320 321"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_25177_11597)">
        <path
          d="M160 319.775C248.366 319.775 320 304.221 320 285.035C320 265.848 248.366 250.294 160 250.294C71.6344 250.294 0 265.848 0 285.035C0 304.221 71.6344 319.775 160 319.775Z"
          fill="#C3EBFA"
        />
        <path
          d="M104.94 74.7351C111.579 101.071 133.748 120.476 160 120.476C186.252 120.476 208.421 101.071 215.06 74.7351H104.94Z"
          fill="#C3EBFA"
          stroke="#C3EBFA"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M260 2.29443H60.0007V32.8544H260V2.29443Z"
          fill="#FAFAFA"
          stroke="#232378"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M60.0001 279.955H260V249.395L60.0001 249.395V279.955Z"
          fill="#FAFAFA"
          stroke="#232378"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M77.4185 35.2649V58.2777C77.4185 95.4956 98.1604 127.435 127.737 141.124C98.1604 154.814 77.4185 186.753 77.4185 223.971V246.983"
          stroke="#232378"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M242.582 246.983V223.971C242.582 186.753 221.84 154.813 192.263 141.124C221.84 127.435 242.582 95.4956 242.582 58.2777V35.2649"
          stroke="#232378"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M102.912 224.373V223.972C102.912 189.676 128.522 161.774 160 161.774C191.479 161.774 217.088 189.676 217.088 223.972V224.373H102.912Z"
          fill="#C3EBFA"
          stroke="#C3EBFA"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_25177_11597">
          <rect
            width="320"
            height="320"
            fill="white"
            transform="translate(0 0.294434)"
          />
        </clipPath>
      </defs>
    </svg>
  )

  const small = (
    <svg
      width="160"
      height="161"
      viewBox="0 0 160 161"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_25177_11598)">
        <path
          d="M80 160.035C124.183 160.035 160 152.258 160 142.665C160 133.071 124.183 125.294 80 125.294C35.8172 125.294 0 133.071 0 142.665C0 152.258 35.8172 160.035 80 160.035Z"
          fill="#C3EBFA"
        />
        <path
          d="M52.47 37.5146C55.7893 50.6824 66.874 60.385 80 60.385C93.126 60.385 104.211 50.6824 107.53 37.5146H52.47Z"
          fill="#C3EBFA"
          stroke="#C3EBFA"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M130 1.29443H30.0004V16.5744H130V1.29443Z"
          fill="#FAFAFA"
          stroke="#232378"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M30 140.125H130V124.845L30 124.845V140.125Z"
          fill="#FAFAFA"
          stroke="#232378"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M38.7092 17.7798V29.2862C38.7092 47.8952 49.0802 63.8649 63.8685 70.7094C49.0802 77.5541 38.7092 93.5236 38.7092 112.133V123.639"
          stroke="#232378"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M121.291 123.639V112.133C121.291 93.5236 110.92 77.5538 96.1316 70.7094C110.92 63.8647 121.291 47.8952 121.291 29.2862V17.7798"
          stroke="#232378"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M51.4561 112.334V112.133C51.4561 94.9849 64.2609 81.0342 80.0001 81.0342C95.7393 81.0342 108.544 94.9849 108.544 112.133V112.334H51.4561Z"
          fill="#C3EBFA"
          stroke="#C3EBFA"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_25177_11598">
          <rect
            width="160"
            height="160"
            fill="white"
            transform="translate(0 0.294434)"
          />
        </clipPath>
      </defs>
    </svg>
  )

  return size === 'small' ? small : big
}

export default Hourglass

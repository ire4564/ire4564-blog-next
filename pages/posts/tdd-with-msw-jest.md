---
title: Test. next.js + msw + jest로 TDD 시도하기
subTitle: TDD with next.js msw jest
category: Test
publishedOn: 2023-01-23 18:08
tag: nextjs javascript react tdd test msw
excerpt: 이번 작업에서  유저가 쓴 글들을 모아볼 수 있는 유저 페이지가 추가되어야 했다. 이 경우에 리스트 컴포넌트와 같은 경우에는 이미 이전에 쓰던 컴포넌트가 있었지만 유저 정보가 들어가 있는 컴포넌트는 새로 만들어야 했다. 게다가 이 유저 정보 컴포넌트는 크리에이터인지, 멤버인지, 소유자인지에 따라서 보여줘야 하는 방식에 대한 케이스가 다양했기 때문에 테스트를 도입하면 좋을 것 같다는 생각이 들었다.
---

import Meta from "../../components/Meta";
import Title from "../../components/Title";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@reach/disclosure";

<Meta title="Test. next.js + msw + jest로 TDD 시도하기" />

<Title
  title={"Test. next.js + msw + jest로 TDD 시도하기"}
  subTitle={"TDD with next.js msw jest"}
  date={"2023-01-23 18:08"}
/>


**목차**

1. 작업에 대한 필요성 (테스트 → 작업  TDD 시도하기)
2. 요구사항에 따른 테스트 케이스 작성
3. msw 재정리
    1. mock data 생성 및 관리
    2. handler 생성 및 관리
    3. import 경로 설정
4. jest + msw를 사용하여 test code 작성하기
    1. 정리한 테스트 케이스를 코드로 변환하기
    2. msw로 경우에 따른 동적인 데이터 세팅하기
    3. 테스트 실행하며 컴포넌트 작업하기
5. 컴포넌트 만들기

### 작업에 대한 필요성 (테스트 → 작업  TDD 시도하기)

---
이번 작업에서  유저가 쓴 글들을 모아볼 수 있는 유저 페이지가 추가되어야 했다. 이 경우에 리스트 컴포넌트와 같은 경우에는 이미 이전에 쓰던 컴포넌트가 있었지만 유저 정보가 들어가 있는 컴포넌트는 새로 만들어야 했다. 

게다가 이 유저 정보 컴포넌트는 크리에이터인지, 멤버인지, 소유자인지에 따라서 보여줘야 하는 방식에 대한 케이스가 다양했기 때문에 테스트를 도입하면 좋을 것 같다는 생각이 들었다. 

### 요구사항에 따른 테스트 케이스 작성

---

위의 요구사항에 따라 아래와 같은 테스트 케이스를 먼저 글로 작성했다. 

**유저 프로필 정보 TC**
- [ ]  해당 커뮤니티 유저가 크리에이터이면  <스튜디오 구경가기> 버튼 노출
- [ ]  자신의 커뮤니티 프로필이면 <스튜디오 구경가기> 버튼 노출되지 않음
- [ ]  해당 커뮤니티의 멤버일 경우 <멤버> 뱃지 표시
- [ ]  해당 커뮤니티의 크리에이터 (owner)일 경우 <별표> 뱃지 표시

### msw 재정리

---

기존에 msw를 사용하고 있었지만 생각보다 잘 사용하고 있지 못했다. (필요할 때만 가끔…) 마침 BE에서도 작업 하는데 시간이 오래 걸리기도 하고, 다양한 케이스에서 다양한 정보가 필요하기 때문에 테스트 용도로 잘 관리하면 좋겠다는 생각이 들어 아래와 같이 순차적으로 정리를 해봤다.

1. **mock data 생성 및 관리**
2. **handler 생성 및 관리**
3. **import 경로 설정**

우선 파일 구조는 아래와 같다. 각각 용도에 따라 디렉토리를 구분했다.

```markdown
│  ├─ mocks
│  │  ├─ browser.ts
│  │  ├─ datas
│  │  │  ├─ userDetailDatas.ts
│  │  │  └─ userPageDatas.ts
│  │  ├─ handlers
│  │  │  └─ userPageHandlers.ts
│  │  ├─ handlers.ts
│  │  ├─ index.ts
│  │  └─ server.ts
```

이번에는 userPage와 Details에 관련된 데이터가 필요하여 생성했다. 테스트가 끝나면 간편하게 지울 수 있도록 파일을 만들어 두었다. api 스펙에 맞춰서 mock 데이터를 생성했다. 

1. **mock data 생성 및 관리**

특히 이번 테스트에서는 userDetailDatas를 사용했는데, 각각 케이스별로 필요한 데이터들을 생성했다.

```tsx
// userDetailDatas
// case: 멤버, 소유자, 크리에이터, 비멤버

export const userDetailsMember = {
  status: 200,
  body: {
    result: {
      email: 'user@gmail.com',
      role: 'USER',
      profileImageUrl:
        'url',
      userName: 'userName',
      permalink: 'userPermalink',
      likedCount: 16,
      userType: 'MEMBER',
    },
    errorMessage: '',
    errorCode: '',
    error: false,
  },
};

export const userDetailsCreator = {
  status: 200,
  body: {
    result: {
      email: 'user2@gmail.com',
      role: 'CREATOR',
      profileImageUrl:
        'url',
      userName: 'userName',
      permalink: 'userPermalink',
      likedCount: 16,
      userType: 'NON_MEMBER',
    },
    errorMessage: '',
    errorCode: '',
    error: false,
  },
};

export const userDetailsOwner = {
  status: 200,
  body: {
    result: {
      email: 'user4@naver.com',
      role: 'CREATOR',
      profileImageUrl:
        'url',
      userName: 'userName',
      permalink: 'userPermalink',
      likedCount: 16,
      userType: 'CREATOR',
    },
    errorMessage: '',
    errorCode: '',
    error: false,
  },
};

export const userDetailsNoneMember = {
  status: 200,
  body: {
    result: {
      email: 'user5@gmail.com',
      role: 'USER',
      profileImageUrl:
        'url',
      userName: 'userName',
      permalink: 'userPermalink',
      likedCount: 16,
      userType: 'NON_MEMBER',
    },
    errorMessage: '',
    errorCode: '',
    error: false,
  },
};
```

1. **handler 생성 및 관리**

그리고 이 목업 데이터를 보내줄 핸들러를 생성했다.

```tsx
//userPageHandlers.ts

import { rest } from 'msw';

import {
  userDetails,
} from '../datas/userPageDatas';

const getUserDetails = (isError?: boolean) => {
  return rest.get('/api/v1/user/details', (req, res, ctx) => {
    const creatorPermalink = req.url.searchParams.get('creatorPermalink');
    const userUuid = req.url.searchParams.get('userUuid');

    if (isError) {
      return res(ctx.status(500));
    }

    if (creatorPermalink || userUuid) {
      return res(ctx.status(200), ctx.json(userDetails));
    }
  });
};

const getUserCommunityPosts = (isError?: boolean) => {
  return rest.get('/api/v1/creator/community/posts', (req, res, ctx) => {
    const creatorPermalink = req.url.searchParams.get('creatorPermalink');
    const userUuid = req.url.searchParams.get('userUuid');
    const page = req.url.searchParams.get('page');

    if (isError) {
      return res(ctx.status(500));
    }

    if (creatorPermalink || userUuid || page) {
      return res(ctx.status(200), ctx.json(userCommunityPosts));
    }
  });
};

const getUserComments = (isError?: boolean) => {
  return rest.get('/api/v1/creator/comments', (req, res, ctx) => {
    const creatorPermalink = req.url.searchParams.get('creatorPermalink');
    const userUuid = req.url.searchParams.get('userUuid');
    const page = req.url.searchParams.get('page');

    if (isError) {
      return res(ctx.status(500));
    }

    if (creatorPermalink || userUuid || page) {
      return res(ctx.status(200), ctx.json(userComments));
    }
  });
};

const userPageHandlers = [
  getUserDetails(),
  getUserCommunityPosts(),
  getUserComments(),
];

export default userPageHandlers;
```

getUserDetails 이외에도 이번에 새로운 api가 3가지가 더 생성되므로, 테스트를 위해 각각의 호출 함수를 선언하고 Handler를 한꺼번에 리턴하는 식으로 만들었다. 이렇게 하면 이번에 테스트하는 핸들러 이외에도 테스트할 다른 핸들러가 생기면 생성과 추가를 쉽게 할 수 있을 것 같다.

데이터와 핸들러가 모두 준비되었다면 기본 설정으로 아래와 같이 broswer, handlers, server를 설정해주면 된다.

```tsx
//browser.ts
import { setupWorker } from 'msw';

import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
```

```tsx
//handlers.ts
import userPageHandlers from './handlers/userPageHandlers';

export const handlers = [...Object.values(userPageHandlers)];
```

```tsx
//server.ts
import { setupServer } from 'msw/node';

import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

그리고 이 msw를 마지막으로 실행시켜주기 위한 index 파일을 작성해 준다.

```tsx
async function initMocks() {
  if (process.env.NODE_ENV === 'development') {
    if (typeof window === 'undefined') {
      (async () => {
        const { server } = await import('../mocks/server');
        server.listen();
      })();
    } else {
      (async () => {
        const { worker } = await import('../mocks/browser');
        worker.start();
      })();
    }
  }
}

export default initMocks;
```

이 함수를 이제 app 최상위에서 실행해 줘야 한다. 간단하게 아래와 같이 실행해줬다.

```tsx
//_app.tsx

export default function MyApp({ Component, pageProps }: AppProps) {
  // Data Mocking
  initMocks();

  return (
    <SWRConfig value={{ fetcher, shouldRetryOnError: false }}>
      <ModalProvider>
        <AccessControl>
          <Component {...pageProps} />
          <Modals />
        </AccessControl>
      </ModalProvider>
    </SWRConfig>
  );
}
```

그럼 이제 아래와 같이 없는 api임에도 불구하고 잘 동작하게 된다!

### jest + msw를 사용하여 test code 작성하기

---

이제 기본적인 msw 세팅은 끝났으니 이전에 작성했던 테스트 케이스를 코드로 변환하도록 했다.

1. **정리한 테스트 케이스를 코드로 변환하기**

```tsx
import { render } from '@testing-library/react';
import { rest } from 'msw';

import {
  userDetailsCreator,
  userDetailsMember,
  userDetailsOwner,
} from 'mocks/datas/userDetailDatas';
import { server } from 'mocks/server';

import UserActivityInfo from './UserActivityInfo';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

describe('UserActivityInfo', () => {
  test('해당 커뮤니티의 멤버일 경우 <멤버> 뱃지 표시', () => {
    const { getByText } = render(<UserActivityInfo />);
    const memberBadge = getByText('멤버');
    expect(memberBadge).toBeInTheDocument();
  });

  test('해당 커뮤니티 유저가 크리에이터이면 <스튜디오 구경 가기> 버튼 노출', () => {
    const { getByText } = render(<UserActivityInfo />);
    const viewStudioButton = getByText('스튜디오 구경가기');
    expect(viewStudioButton).toBeInTheDocument();
  });

  test('자신의 커뮤니티 프로필이면 <스튜디오 구경가기> 버튼 노출되지 않음', () => {
    const { queryByText } = render(<UserActivityInfo />);
    const viewStudioButton = queryByText('스튜디오 구경가기');
    expect(viewStudioButton).toBeNull();
  });

  test('해당 커뮤니티의 크리에이터 (owner)일 경우 <별표> 뱃지 표시', () => {
    const { getByText } = render(<UserActivityInfo />);
    const starBadge = getByText('Star');
    expect(starBadge).toBeInTheDocument();
  });
});
```

기본적으로 각각 테스트 케이스에 따라 보여야 할 컴포넌트 내부의 텍스트를 이용하여 케이스를 판별하도록 작성했다. 하지만 문제는 다양한 테스트 케이스에서 유동적으로 api에서 정보를 바꿔줘야 한다는 점이었다. 그래서 **server.use** 를 사용하여 동적으로 이전에 작성한 테스트 케이스에 맞는 데이터를 보여주도록 작성하였다.

1. **msw로 경우에 따른 동적인 데이터 세팅하기**

```tsx
import { render } from '@testing-library/react';
import { rest } from 'msw';

import {
  userDetailsCreator,
  userDetailsMember,
  userDetailsOwner,
} from 'mocks/datas/userDetailDatas';
import { server } from 'mocks/server';

import UserActivityInfo from './UserActivityInfo';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

describe('UserActivityInfo', () => {
  test('해당 커뮤니티의 멤버일 경우 <멤버> 뱃지 표시', () => {
    **server.use(
      rest.get('/api/v1/user/details', (_, res, ctx) => {
        return res(ctx.json(userDetailsMember));
      }),
    );**

    const { getByText } = render(<UserActivityInfo />);
    const memberBadge = getByText('멤버');
    expect(memberBadge).toBeInTheDocument();
  });

  test('해당 커뮤니티 유저가 크리에이터이면 <스튜디오 구경 가기> 버튼 노출', () => {
    **server.use(
      rest.get('/api/v1/user/details', (_, res, ctx) =>
        res(ctx.json(userDetailsCreator)),
      ),
    );**
    const { getByText } = render(<UserActivityInfo />);
    const viewStudioButton = getByText('스튜디오 구경가기');
    expect(viewStudioButton).toBeInTheDocument();
  });

  test('자신의 커뮤니티 프로필이면 <스튜디오 구경가기> 버튼 노출되지 않음', () => {
    **server.use(
      rest.get('/api/v1/user/details', (_, res, ctx) =>
        res(ctx.json(userDetailsOwner)),
      ),
    );**
    const { queryByText } = render(<UserActivityInfo />);
    const viewStudioButton = queryByText('스튜디오 구경가기');
    expect(viewStudioButton).toBeNull();
  });

  test('해당 커뮤니티의 크리에이터 (owner)일 경우 <별표> 뱃지 표시', () => {
    **server.use(
      rest.get('/api/v1/user/details', (_, res, ctx) =>
        res(ctx.json(userDetailsOwner)),
      ),
    );**
    const { getByText } = render(<UserActivityInfo />);
    const starBadge = getByText('Star');
    expect(starBadge).toBeInTheDocument();
  });
});
```

### +) 오류: **import 경로 설정**

한 가지 문제가 발생했다. mock 데이터를 Jest 테스트 코드에서 가져오려고 하는데 경로가 올바른데도 불구하고 <moudle not found> 이슈가 생겼다. 이때, 글을 찾아본 결과 `jest.config.js`에서 `moduleNameMapper`로 불러오는 경로를 매핑해줘야 한다는 사실을 알게 되었다. 아래와 같이 추가해줬다. 

[jest.config - mouduleNameMapper @ 경로 인식 에러 해결하기](https://it-timehacker.tistory.com/95)

```jsx
module.exports = {
  modulePaths: ['<rootDir>'],
  setupFilesAfterEnv: ['jest-plugin-context/setup', '<rootDir>/jest.setup.js'],
  collectCoverageFrom: [
    '!**/__tests__/',
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  moduleNameMapper: {
    **'^mocks/(.*)$': '<rootDir>/src/mocks/$1',
    '^mocks/datas/(.*)$': '<rootDir>/src/mocks/datas/$1',**
    '^uuid$': 'uuid',
    '^lodash-es$': 'lodash',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^.+\\.(jpg|jpeg|png|gif|webp|avif)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.svg': '<rootDir>/__mocks__/svgrMock.js',
    '^swiper/react$': '<rootDir>/__mocks__/swiper/react.js',
    '^swiper/modules$': '<rootDir>/__mocks__/swiper/index.js',
    '^swiper/css$': '<rootDir>/__mocks__/swiper/css/bundle.js',
  ...
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/coverage/',
    '<rootDir>/config/',
    '<rootDir>/.next/',
    '.eslintrc.js',
    '.prettierrc.js',
 ...
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '/node_modules/(?![swiper/react/swiper-slide.js])',
    '/node_modules/(?![swiper/react/swiper.js])',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
};
```

오류가 나지 않고 테스트가 잘 돌아갔다!

![](https://velog.velcdn.com/images/ire4564/post/ac6b6893-11b1-4404-aede-9696bf78f4f6/image.png)


1. **테스트 실행하며 컴포넌트 작업하기**

이렇게 작성한 테스트 코드를 실시간으로 보면서 내가 컴포넌트를 잘 만들고 있는지 확인하며 작업하고 싶었다. 그래서 package.json에 아래의 명령어를 추가로 세팅하였다.

```json
{
  "name": "steadio-web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
  ...
    **"test:watch-unit": "jest --watchAll",**
    "coverage": "jest --coverage --passWithNoTests"
  },
  "lint-staged": {
    "./src/**/*.{js,jsx,ts,tsx}": [
      "npx eslint --fix"
    ]
  },
  "dependencies": {
   ...
  },
  "msw": {
    "workerDirectory": "public"
  }
}
```

`npm run test:watch [test할 파일명]`

이제 위의 명령어로 작업한 내용을 실시간으로 비교하면서 테스트 할 수 있도록 하였다.


이제 테스트를 기반으로 컴포넌트를 작성해보자!
  

참고글
  
- [MSW(Mock Service Worker)로 더욱 생산적인 FE 개발하기](https://velog.io/@khy226/msw%EB%A1%9C-%EB%AA%A8%EC%9D%98-%EC%84%9C%EB%B2%84-%EB%A7%8C%EB%93%A4%EA%B8%B0)
  
 - [[React] 🛠React에서 TDD 하는 방법
](https://velog.io/@tata-v_vlelog/React-React%EC%97%90%EC%84%9C-TDD-%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95)
- [MSW를 활용하는 Front-End 통합테스트
](https://fe-developers.kakaoent.com/2022/220825-msw-integration-testing/)

# Works Asset Structure

`Works` 안의 각 프로젝트는 아래처럼 같은 slug 이름으로 관리합니다.

## Folder Rules

1. 정적 이미지, 영상, 오디오, gif 같은 웹 자산은 `public/works/<slug>/` 에 저장
2. 실제로 창 안에 렌더링할 React UI 소스는 `components/works/<slug>/` 에 저장
3. 프로젝트 설명, 링크, 메모, 화면 구성 문서는 필요하면 같은 slug 기준으로 별도 관리

## Current Slugs

- `debugging-dating-algorithms`
- `ai-moderators`
- `understanding-korean-emoticons`
- `compass-travel-mate`

## Recommended Asset Naming

- 대표 썸네일: `cover.png`
- 첫 화면 목업: `screen-home.png`
- 상세 화면들: `screen-01.png`, `screen-02.png`
- 프로토타입 보조 자산: `asset-*`

## Example

- `public/works/debugging-dating-algorithms/cover.png`
- `public/works/debugging-dating-algorithms/screen-home.png`
- `components/works/debugging-dating-algorithms/`

## Why This Split

`public` 은 브라우저에서 바로 불러오는 이미지 경로용이고, `components` 는 더블클릭 후 실제로 띄울 앱 UI 코드용입니다.  
즉, "이미지 파일만 있는 상태"와 "버튼 눌러 다른 화면이 열리는 상태"를 같은 폴더에 섞지 않는 것이 좋습니다.

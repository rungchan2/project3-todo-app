Todo APP
========

## 프로젝트 개요
프로젝트와 할일을 관리할 수 있는 웹 애플리케이션입니다. 사용자는 프로젝트를 생성하고, 팀원을 초대하며, 할일을 관리할 수 있습니다.

## 기술 스택

### 백엔드
- **런타임**: Node.js (>=20.x, 21.x 제외)
- **프레임워크**: Express.js
- **데이터베이스**: MySQL
- **ORM**: Sequelize

### API 구조
- **사용자 관리**: `/api/users`
  - 회원가입, 로그인, 사용자 정보 관리
- **프로젝트 관리**: `/api/projects`
  - 프로젝트 CRUD, 멤버 관리
- **할일 관리**: `/api/todos`
  - 할일 CRUD, 프로젝트별 할일 관리

## 주요 기능
- 사용자 인증 및 권한 관리
- 프로젝트 생성 및 관리
- 프로젝트 멤버 관리 (역할: admin, member)
- 할일 생성 및 관리
- 프로젝트별 할일 목록 조회

## 설치 방법

### 요구사항
- Node.js >=20.x (21.x 제외)
- MySQL 8.0 이상
- Yarn 패키지 매니저

### 설치 단계

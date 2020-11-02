# StudyPro PJT :man_student:

언제 어디서나 모일 수 있는 공간, 스터디프로입니다. 

간편하게 스터디를 찾아보고, 클릭 한 번으로 스터디원과 만나보세요! 온라인이지만 실제로 옆에 있는 것처럼 내 화면을 보여주고, 얼굴을 마주보면서 이야기할 수 있다면 어떨까요? 놀라운 스터디의 새로운 플랫폼, 스터디프로를 보여드리겠습니다. 

![](C:\Users\multicampus\AppData\Roaming\Typora\typora-user-images\image-20201102132914962.png)

## 서비스 설명 :artificial_satellite:

스터디프로만의 두 가지 핵심기능을 소개합니다!

![image-20201102135733807](C:\Users\multicampus\AppData\Roaming\Typora\typora-user-images\image-20201102135733807.png)

### 1. 온라인 스터디 - 워크스페이스

원격이지만 바로 옆에 있는 것처럼 같이 스터디를 할 수 있어요. 노트북에 있는 웹캠을 통해서 화상회의, 실시간 채팅, 화이트 보드, 쉐어뷰, 노트패드와 같은 기능을 제공합니다. 

- 화이트보드

  팀원들과 같이 그림을 그리면서 알고리즘, 서비스 기획 등을 설명할 수 있는 공간입니다.

![image-20201102133154752](C:\Users\multicampus\AppData\Roaming\Typora\typora-user-images\image-20201102133154752.png)



- 쉐어 뷰

  온라인이지만 바로 옆에 있는 것처럼! 내 화면을 공유해서 같이 볼 수 있어요. 특히, 코드나 PPT등 세부적으로 화면을 보면서 이야기해야 하는 작업에는 굉장히 유용합니다 .

![image-20201102133235992](C:\Users\multicampus\AppData\Roaming\Typora\typora-user-images\image-20201102133235992.png)



- 노트패드 

  팀원들과 동시에 문서를 수정할 수 있는 공간이에요. 로컬에 있는 문서를 불러와서 실시간으로 팀원들과 같이 수정할 수 있습니다. 마크다운 형식도 지원이 되서  README.md 를 작성하기에 완전 완성맞춤입니다.

![image-20201102133255145](C:\Users\multicampus\AppData\Roaming\Typora\typora-user-images\image-20201102133255145.png)




- 녹화 기능

  워크스페이스 공간에서 한 스터디 활동을 녹화할 수 있어요! "어 이거 옛날에 공부했던건데" 라고 생각만 하면서 까먹고 놓치는 일은 이제 없을 거에요. 

![image-20201102135148744](C:\Users\multicampus\AppData\Roaming\Typora\typora-user-images\image-20201102135148744.png)



### 2. 스터디 활동 관리

같이 만나는 것으로만은 스터디가 유지되기 힘들죠. 저희는 스터디가 지속적으로 유지되고 활동을 관리할 수 있는 서비스도 같이 제공합니다. 온라인 스터디 활동을 녹화해서 같이 공유할 수도 있죠. 그리고 스터디 스케쥴을 같이 관리하면서, 스터디 이벤트나 일정도 참여할 수 있습니다.

- 스터디 검색 및 매칭

  내가 원하는 스터디를 쉽고 빠르게 매칭할 수 있습니다. 이름으로도 간편하게, 그리고 내가 원하는 시간대에 맞춰서 스터디를 찾을 수 있죠. 

  ![image-20201102135411726](C:\Users\multicampus\AppData\Roaming\Typora\typora-user-images\image-20201102135411726.png)

![image-20201102135349170](C:\Users\multicampus\AppData\Roaming\Typora\typora-user-images\image-20201102135349170.png)



- 스터디 일정 관리

  스터디 일정을 캘린더에 추가하면 알림으로 확인할 수 있습니다. 스터디 세미나나 스터디 자체 활동을 관리하기에 굉장히 편리합니다. 

![image-20201102135527688](C:\Users\multicampus\AppData\Roaming\Typora\typora-user-images\image-20201102135527688.png)



- 스터디원과 자료 공유

  따로 스터디원과 자료를 공유하기 위해 타 플랫폼을 이용하지 않아도 되요. 스터디만의 게시글오 서로 이야기할 수 있습니다. 그리고 첨부파일이 가능하니, 스터디에 필요한 자료도 같이 공유할 수 있죠.

![image-20201102135623824](C:\Users\multicampus\AppData\Roaming\Typora\typora-user-images\image-20201102135623824.png)



## 사용 설명서 :hand:

### 설치하기

:point_right: **bash 환경**에서 다음 명령어 실행하기

`git clone https://github.com/swimminglee/studypro`



### 실행하기

:point_right: Front-end

```bash
cd studypro/front
npm install 
npm build
cp dist $DEPLOY_PATH
```

:point_right: Back-end

```bash
cd studypro/back
npm install
pm2 start
```



> 개발할때는 젠킨스를 이용하여 배포하였습니다. 



## 핵심 서비스 기술 :athletic_shoe:

### webRTC를 이용한 스터디원 연결 구조



### redis를 이용한 트랜젹션 감소








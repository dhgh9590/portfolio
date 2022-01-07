
    /* work */
    const workBtn = document.querySelector(".work__btn");
    const workContent = document.querySelector(".work__content");
    const workItems = document.querySelectorAll(".work__item");
    const categoryBtn = document.querySelectorAll(".category__btn");

    //workItems에 class 추가
    workItems.forEach((el)=>{
        el.addEventListener("mouseenter",()=>{
            el.classList.add("active");
        });
        el.addEventListener("mouseleave",()=>{
            workItems.forEach((e)=>{
                e.classList.remove("active");
            });
        });
    });
    
    //버튼에 class추가
    categoryBtn.forEach((el)=>{
        el.addEventListener("click",()=>{
            categoryBtn.forEach((e)=>{
                e.classList.remove("active");
            });
            el.classList.add("active");
        });
    });

    workBtn.addEventListener("click",(e)=>{
        const filter = e.target.dataset.filter;
        if(filter == null){
            return;
        }

        //animation 효과
        workContent.classList.add("anim-out");
        setTimeout(function(){
            //type비교해서 class 추가
            workItems.forEach((workItem)=>{
                if(filter === "*" || filter === workItem.dataset.type){
                    workItem.classList.remove("invisible");
                }else{
                    workItem.classList.add("invisible");
                }
            });
            workContent.classList.remove("anim-out");
        },300);
    });



    /* 숫자 카운트 */
    let numAnimation = document.querySelectorAll(".num__animation");
    let skillList = document.querySelectorAll(".skill__list");
    
    skillList.forEach(function(el,index){
        el.addEventListener("mouseenter",function(){
            skillList.forEach((el)=>{
                el.classList.remove("active");
            });
            el.classList.add("active");
            changeNum(index);
        });
        el.addEventListener("mouseleave",function(){
            skillList.forEach((el)=>{
                el.classList.remove("active");
            });
        });
    });

    //숫자 카운트 함수
    function changeNum(index){
        let num = 0;
        let targetNum = numAnimation[index].getAttribute("data-rate");
        let timer = setInterval(function(){
        ++num;
        numAnimation[index].innerText = num;
        if(num == targetNum){
                clearInterval(timer);
            }
        },10);
    }

    /* 타이핑 효과 */
    let target = document.querySelector("#dynamic");
    //3초 후 랜덤한 문장 실행 (순서3)
    function randomString(){ 
        let stringArr = ["#Javascript  #React  #Jquery"]; //target에 들어갈 문장 배열로 저장
        let selectString = stringArr[Math.floor(Math.random() * stringArr.length)];//stringArr을 랜덤으로 불러오기  * length만큼 랜덤 만들기 Math.floor는 소수점을 없에줌
        let selectStringArr = selectString.split(""); //"" 기준으로 글자가 쪼개져 배열로 됨

        return selectStringArr; //최종 변수값을 리턴
    }

    //타이핑 리셋 (순서2)
    function resetTyping(){//타겟을 빈값으로 만들고 랜덤한 문장을 다시 가지고 옴
        target.textContent = ""; //textContent는 innerText와 비슷함
        dynamic(randomString());
    }

    //한글자씩 텍스트 출력 함수 (순서1)
    function dynamic(randomArr){
        if(randomArr.length > 0){
            target.textContent += randomArr.shift(); //shift는 배열이 있으면 배열의 앞에값을 밖으로 빼내줌
            setTimeout(function(){ //값이 거짓이 될떼까지 dynamic를 실행함
                dynamic(randomArr);
            },100);
        }else{
            setTimeout(resetTyping, 5000); //값이 거짓이 되면 resetTyping을 실행함
        }
    }

    //타이핑 효과 1초후에 실행
    setTimeout(function(){
        dynamic(randomString());
    },2000);

    //커서 깜빡임 효과
    function blink(){
        target.classList.toggle("active");
    }
    setInterval(blink, 500);

    /* 스크롤시 배너 투명도 */
    const home = document.querySelector("#section1");
    const homeHeight = home.getBoundingClientRect().height;
    const title = document.querySelector(".title");
    window.addEventListener("scroll",()=>{
        title.style.opacity = 1 - window.scrollY / homeHeight;
    });

    /* 윈도우 로드 이벤트 */
    window.addEventListener("load",function(){
        document.querySelector(".title__text").classList.add("active");
    });

    /* 메뉴 리스트 클릭시 해당 영역으로 이동 */
    const menuList = document.querySelectorAll(".menu__right ul li a");
    menuList.forEach((el)=>{
        el.addEventListener("click",(e)=>{
            e.preventDefault();
            document.querySelector(el.getAttribute("href")).scrollIntoView({
                behavior:"smooth"
            })
        });
    });

    /* 네비 슬라이드 */
    let menuLine = document.getElementById("menu__line");
    let horizontalMenus = document.querySelectorAll(".menu__right ul li");
    function horizontaIndicator(e){
        menuLine.style.left = e.currentTarget.offsetLeft + "px";
        menuLine.style.width = e.currentTarget.offsetWidth + "px";
    }
    horizontalMenus.forEach((menu) => {
        menu.addEventListener("click",(e) =>{
            horizontaIndicator(e)
        });
    });

    /* 스크롤시 section에 active 클레스 추가 및 네비 슬라이드 이동 */
    window.addEventListener("scroll",scrollProgress);
    function scrollProgress(){
        let scrollTop = (window.pageYOffset || document.documentElement.scrollTop || window.scrollY) + window.innerHeight - 300;
        let contentItem = document.querySelectorAll(".content__item");
        contentItem.forEach((item,index)=>{
            if(scrollTop > item.offsetTop){
                //전부 active삭제
                contentItem.forEach((el)=>{
                    el.classList.remove("active");
                });
                //해당하는 section만 active 추가
                item.classList.add("active");
                //스크롤시 메뉴 슬라이드가 해당하는 메뉴로 이동
                menuLine.style.left = horizontalMenus[index].offsetLeft + "px";
                menuLine.style.width = horizontalMenus[index].offsetWidth + "px";
            }
        });
    }
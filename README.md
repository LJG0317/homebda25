---

# 📌 **1. 데이터사이언티스트·신입 데이터 분석가 포트폴리오에 포함되어야 할 필수 내용 정리**

### ✅ **(1) About Me / Intro**

* 간단한 소개
* 관심 분야 (예: 사용자 데이터, 추천 시스템, 고객 분석 등)
* 데이터 분석가로서 지향점

---

### ✅ **(2) Skill Set**

**언어/툴**

* Python: Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn
* SQL: JOIN, Window Function, Subquery
* Excel: 데이터 정리, 피벗·함수(VLOOKUP, COUNTIFS, INDEX/MATCH), 매크로(선택)
* Tableau: Dashboard, LOD, Parameter

**역량**

* 데이터 전처리
* EDA
* 인사이트 도출
* 모델링(분류/회귀)
* 시각화 대시보드 제작
* 가설 검증/지표 분석
* 도메인 기반 문제 정의

---

### ✅ **(3) 프로젝트 (Portfolio 핵심)**

프로젝트는 다음 요소를 반드시 포함:

* 문제 정의(Why?)
* 데이터 설명(출처·구조·전처리)
* 분석 과정(전처리·EDA·모델링·각종 그래프)
* 결과(인사이트·모델 성능)
* 한계점 및 개선 방안
* 사용 기술(Python, SQL, Excel, Tableau)

---

### ✅ **(4) GitHub Repository 구성**

* `project-name/`
  ├─ `notebooks/`
  ├─ `data/`
  ├─ `src/`
  ├─ `dashboard/`
  ├─ `README.md`
* 각 프로젝트 별 독립적 구조
* README 내 요약 + 이미지 + 인사이트 + 코드 링크 포함

---

### ✅ **(5) 문서화 역량**

* 보고서(PDF), Tableau 이미지
* 분석 과정에서 했던 의사결정 설명
* 가설 기반 접근법과 비즈니스 시사점

---

---

# 📘 **2. GitHub README용 | 신입 데이터 분석가 포트폴리오 (예시 완성본)**

아래 내용을 그대로 README에 복붙해도 됩니다.

---

# 📊 **Data Analyst Portfolio (신입 데이터 분석가 포트폴리오)**

안녕하세요!
Python, SQL, Excel, Tableau를 활용해 **데이터 기반 문제 해결**에 집중하는 신입 데이터 분석가 지망생입니다.
비즈니스 목표를 이해한 뒤, 데이터를 통해 **패턴을 설명하고, 원인을 찾고, 개선 방향을 제시하는 분석가**를 목표로 합니다.

---

## 📌 **Skills**

### 🔧 Data Handling

* Python: Pandas, NumPy
* SQL: JOIN · Window Function · Aggregation
* Excel: 데이터 가공, 피벗, COUNTIFS, INDEX/MATCH

### 📈 Visualization

* Tableau (Dashboard, LOD)
* Matplotlib · Seaborn

### 🤖 Machine Learning

* Scikit-learn: Classification / Regression
* Feature Engineering · GridSearchCV

### 🔍 Analysis

* EDA
* 가설 검정
* KPI 분석
* Funnel 분석

---

# 📂 **Projects**

아래는 신입 데이터 분석가 포트폴리오에서 가장 실무적으로 인정받는 **Python + SQL + Excel + Tableau** 기반 3종 프로젝트입니다.

---

# ⭐ **Project 1. 이커머스 고객 행동 기반 이탈 예측 모델링**

**Skills:** Python, SQL, Tableau
**Tags:** 분석, 모델링, 고객 리텐션, 분류모델

### 🎯 **목적**

* 최근 3개월 간 구매 이력이 감소한 고객의 **이탈 확률을 예측**하고
* 고객 세그먼트별 **이탈 원인과 대응 전략**을 제시하는 프로젝트

### 🗂 **데이터**

* 고객 정보
* 행동 로그(방문 수, 체류 시간, 장바구니, 클릭수)
* 구매 정보(최근 구매일, 구매금액, 카테고리)

SQL을 통해 테이블 4개를 JOIN하여 분석용 데이터셋 생성.

```sql
SELECT c.customer_id,
       log.visit_count,
       log.session_time,
       o.total_order,
       o.total_amount,
       CASE WHEN o.last_order_date <= ADD_MONTHS(SYSDATE, -3)
            THEN 1 ELSE 0 END AS is_churn
FROM customers c
LEFT JOIN user_log log ON c.customer_id = log.customer_id
LEFT JOIN order_info o ON c.customer_id = o.customer_id;
```

### 🔍 **분석 과정**

* Python으로 결측치 처리, 이상치 제거
* RFM(Recency, Frequency, Monetary) 변수 생성
* RandomForest, Logistic Regression 비교
* SHAP으로 Feature Importance 분석
* Tableau로 고객군별 이탈률 대시보드 제작

### 📊 **결과**

* 최적 모델: **RandomForest (AUC 0.87)**
* 주요 이탈 지표

  * 최근 방문 간격(Recency)
  * 장바구니 방문 대비 구매전환율
  * 특정 카테고리 구매 이탈
* 고가 상품 중심 고객군에서 이탈 증가

### 💡 **인사이트**

* 최근 방문일이 25일 이상인 고객은 이탈 위험이 3배
* 장바구니만 반복적으로 사용하는 고객군은 “high intent - low conversion” 패턴 확인
* ‘디지털가전’ 군에서 이탈률이 가장 높았으며 재고 부족이 주요 원인

### 📝 **개선안**

* 20일 미방문 고객군 쿠폰 자동 발송
* 장바구니 → 구매 전환 유도 팝업
* 인기 품목 재고 부족 예측 모델 추가 필요

---

# ⭐ **Project 2. 지역별 부동산 거래 분석 대시보드 (Tableau + SQL)**

**Skills:** Tableau, SQL
**Tags:** 시각화, LOD, 정책 분석, 전년 대비 변화율

### 🎯 **목적**

* 지역·층수·면적대별 거래 패턴을 분석해
  **정책 보고 및 사용자 정보 제공용 실무형 대시보드 제작**

### 🗂 데이터 & SQL 전처리

```sql
SELECT region,
       year,
       floor,
       area,
       COUNT(transaction_id) AS trade_cnt,
       AVG(price) AS avg_price
FROM apt_trade
GROUP BY region, year, floor, area;
```

### 🔍 **분석 내용**

* LOD로 연도별 중위가격 계산
* 전년 대비 변화율 계산
* 파라미터로 면적, 층수, 지역 조절 가능
* 거래량/가격/전년 대비 변화율 3가지 축 구성

### 📊 **주요 결과**

* 고층 아파트는 동일 면적 대비 평균 **10% 높은 가격**
* 지방 대도시는 거래량이 전년 대비 20~35% 감소
* 소형주택(60㎡ 이하)은 꾸준한 수요 유지

---

# ⭐ **Project 3. 상품 리뷰 텍스트 감성 분석 (Python + Excel)**

**Skills:** Python(NLP), Excel 전처리
**Tags:** NLP, 감성분석, 텍스트 분석

### 🎯 **목적**

상품 리뷰를 분석하여
**서비스 개선 포인트와 고객 불만 원인**을 명확하게 파악하는 프로젝트

### 🔧 데이터 전처리 (Excel → Python)

* Excel에서 중복 제거, COUNTIFS로 리뷰 빈도 집계
* Python으로 불용어 제거 후 형태소 분석(MeCab)
* TF-IDF 벡터화
* Logistic Regression 기반 감성 분류 모델 구축

### 📊 **결과**

* 정확도: 88%
* 부정 리뷰 핵심 키워드: “배송 지연”, “파손”, “불친절”
* 긍정 리뷰 키워드: “가성비”, “빠른 배송”, “품질”

### 💡 **실무 인사이트**

* 재고창고 지역별 배송 차이 → KPI: 파손율/지연율 분석 필요
* 제품 카테고리별 불만 유형 정리해 VOC 대응 개선

---

# 📁 **4. Repository Structure (GitHub 기본 구조)**

```
📦 portfolio
 ┣ 📂 ecommerce_churn
 ┃ ┣ 📂 notebooks
 ┃ ┣ 📂 data
 ┃ ┣ 📂 dashboard
 ┃ ┗ README.md
 ┣ 📂 real_estate_dashboard
 ┣ 📂 review_sentiment
 ┗ README.md (Main)
```

---

# 🎯 **5. Career Goal**

데이터를 기반으로 **문제의 원인을 찾아 개선해내는 분석가**가 되는 것이 목표입니다.
비즈니스 목적에 맞는 KPI를 설정하고, 행동 가능한 인사이트를 전달할 수 있는 분석가를 지향합니다.

---

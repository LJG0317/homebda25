<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

    <title>Diamonds Data Strategic Analysis Report</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/reveal.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Pretendard:wght@300;400;700&display=swap');

        :root {
            --bg-gradient: linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #3b0764 100%);
            --glass-bg: rgba(255, 255, 255, 0.03);
            --glass-border: rgba(255, 255, 255, 0.1);
            --highlight: #a855f7;
            --title-font: 32px;
            --content-font: 18.6px;
        }

        .reveal {
            background: var(--bg-gradient);
            font-family: 'Pretendard', sans-serif;
            color: #ffffff;
        }

        .slide-container {
            display: grid;
            grid-template-columns: 38% 62%;
            gap: 20px;
            height: 100%;
            align-items: center;
            text-align: left;
        }

        .left-content h2 {
            font-size: var(--title-font) !important;
            color: #ffffff !important;
            font-weight: 700 !important;
            line-height: 1.2 !important;
            margin-bottom: 20px !important;
            text-shadow: 0 0 20px rgba(168, 85, 247, 0.6);
        }

        .image-box {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 15px;
            padding: 10px;
            margin-top: 15px;
        }

        .image-box img {
            max-width: 100%;
            border-radius: 10px;
        }

        .right-content {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .glass-card {
            background: var(--glass-bg);
            backdrop-filter: blur(12px);
            border: 1px solid var(--glass-border);
            border-radius: 16px;
            padding: 15px 20px;
            display: flex;
            align-items: center;
            gap: 15px;
            transition: all 0.3s ease;
        }

        .glass-card:hover {
            border-color: var(--highlight);
            transform: translateX(10px);
            background: rgba(255, 255, 255, 0.07);
        }

        .card-icon {
            font-size: 20px;
            color: var(--highlight);
            min-width: 30px;
            text-align: center;
        }

        .card-text {
            font-size: var(--content-font) !important;
            line-height: 1.4;
            color: #e2e8f0;
        }
    </style>
</head>
<body>

<div class="reveal">
    <div class="slides">

        <!-- 슬라이드 1: 타이틀 -->
        <section data-background="linear-gradient(135deg, #0f172a 0%, #581c87 100%)">
            <div style="text-align: center;">
                <h1 style="font-size: 45px; color: white; text-shadow: 0 0 30px #a855f7;">DIAMONDS MARKET<br>STRATEGIC REPORT</h1>
                <p style="font-size: 22px; opacity: 0.8;">데이터 기반 시장 분석 및 수익 최적화 인사이트</p>
                <div style="margin-top: 50px; border-top: 1px solid rgba(255,255,255,0.2); display: inline-block; padding-top: 20px;">
                    Analytics & Business Intelligence Group
                </div>
            </div>
        </section>

        <!-- 슬라이드 2: 가격 구조 분석 -->
        <section>
            <div class="slide-container">
                <div class="left-content">
                    <h2>01.<br>Price Distribution</h2>
                    <p>가격 불균형 및 시장 쏠림 현상 분석</p>
                    <div class="image-box">
                        <img src="diamond/images/price_hist.png" alt="Price Histogram">
                    </div>
                </div>
                <div class="right-content">
                    <div class="glass-card">
                        <i class="fas fa-chart-pie card-icon"></i>
                        <span class="card-text">가격 평균($3,932) 대비 중앙값($2,401)이 낮은 우측 꼬리가 긴 분포를 보이며 저가 다이아몬드 시장의 높은 밀집도 확인임.</span>
                    </div>
                    <div class="glass-card">
                        <i class="fas fa-dollar-sign card-icon"></i>
                        <span class="card-text">최대 가격이 $18,823에 달하는 고가 프리미엄 상품군이 전체 평균을 상향 견인하며 소수 상위 계층을 위한 럭셔리 마켓의 존재 증명임.</span>
                    </div>
                    <div class="glass-card">
                        <i class="fas fa-filter card-icon"></i>
                        <span class="card-text">전체 데이터의 75%가 $5,324 이하에 분포하고 있어 대중적인 실속형 상품군이 매출 수량 측면에서 핵심적인 비중을 차지함임.</span>
                    </div>
                    <div class="glass-card">
                        <i class="fas fa-tags card-icon"></i>
                        <span class="card-text">가격 변동성(std)이 $3,989로 매우 높아 상품별 등급 및 특성에 따른 가격 차별화 전략이 수익 창출의 필수적 요소로 판단됨임.</span>
                    </div>
                    <div class="glass-card">
                        <i class="fas fa-search-dollar card-icon"></i>
                        <span class="card-text">최저가 $326 상품부터 초고가 상품까지 폭넓은 라인업을 보유하여 다양한 소비 계층을 수용할 수 있는 포트폴리오 다변화 전략의 기초임.</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- 슬라이드 3: 세공 품질(Cut) 전략 -->
        <section>
            <div class="slide-container">
                <div class="left-content">
                    <h2>02.<br>Cut Quality Strategy</h2>
                    <p>세공 품질별 단가 분석 및 재고 전략</p>
                    <div class="image-box">
                        <img src="diamond/images/price_box_by_cut.png" alt="Price Boxplot by Cut">
                    </div>
                </div>
                <div class="right-content">
                    <div class="glass-card">
                        <i class="fas fa-gem card-icon"></i>
                        <span class="card-text">가장 우수한 Ideal 컷이 21,551건으로 최대 빈도를 기록하며 시장 내 표준 품질로서 강력한 선호도와 공급 체계를 형성하고 있음임.</span>
                    </div>
                    <div class="glass-card">
                        <i class="fas fa-balance-scale card-icon"></i>
                        <span class="card-text">Ideal 컷의 평균 가격($3,457)이 Premium이나 Fair보다 낮은 현상은 고품질 세공이 주로 중량이 작은 캐럿에 집중된 결과로 분석됨임.</span>
                    </div>
                    <div class="glass-card">
                        <i class="fas fa-arrow-up card-icon"></i>
                        <span class="card-text">Premium 컷의 평균 가격($4,584)이 가장 높게 형성되어 있어 대형 캐럿과 우수한 세공의 결합이 실질적인 고수익 상품군을 형성함임.</span>
                    </div>
                    <div class="glass-card">
                        <i class="fas fa-box-open card-icon"></i>
                        <span class="card-text">Fair 컷은 빈도수(1,610건)는 가장 적으나 중앙값($3,282)은 높아 희소 가치와 중량 위주의 틈새 시장을 점유하고 있는 특이 구조임.</span>
                    </div>
                    <div class="glass-card">
                        <i class="fas fa-lightbulb card-icon"></i>
                        <span class="card-text">최상위 세공 품질인 Ideal 컷을 주력으로 하되 고단가 확보를 위해 Premium 및 Very Good 등급의 마케팅 강화가 수익성 개선의 핵심임.</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- 슬라이드 4: 중량(Carat)과 가격 상관관계 -->
        <section>
            <div class="slide-container">
                <div class="left-content">
                    <h2>03.<br>Carat vs Price Dynamics</h2>
                    <p>중량 가치 및 선명도(Clarity) 영향도</p>
                    <div class="image-box">
                        <img src="diamond/images/price_vs_carat_scatter.png" alt="Carat vs Price">
                    </div>
                </div>
                <div class="right-content">
                    <div class="glass-card">
                        <i class="fas fa-compress-alt card-icon"></i>
                        <span class="card-text">캐럿과 가격 간의 상관계수가 0.92로 극도로 높게 나타나며 중량 증가가 가격 상승을 결정짓는 절대적인 변수임을 정량적으로 확인함임.</span>
                    </div>
                    <div class="glass-card">
                        <i class="fas fa-microscope card-icon"></i>
                        <span class="card-text">선명도 등급이 높은 IF, VVS1 계열은 0.5캐럿 내외의 소형 상품에 집중되어 있으며 고가 시장은 SI2 등급의 대형 캐럿이 주도함임.</span>
                    </div>
                    <div class="glass-card">
                        <i class="fas fa-chart-line card-icon"></i>
                        <span class="card-text">특정 캐럿(1.0, 1.5, 2.0) 구간에서 가격이 급격히 상승하는 계단식 프리미엄 구간이 존재하여 해당 규격에 맞춘 공급량 조절이 필요함임.</span>
                    </div>
                    <div class="glass-card">
                        <i class="fas fa-eye card-icon"></i>
                        <span class="card-text">I1 등급은 평균 1.28캐럿으로 가장 크지만 평균 가격은 $3,924에 불과하여 크기 대비 가격 경쟁력을 선호하는 대중 시장 타겟임임.</span>
                    </div>
                    <div class="glass-card">
                        <i class="fas fa-expand-arrows-alt card-icon"></i>
                        <span class="card-text">중량이 커질수록 가격 산포가 넓어지는 경향은 고캐럿 영역에서 품질(Color, Clarity)에 따른 프리미엄 격차가 극대화됨을 시사함임.</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- 슬라이드 5: 컬러 마케팅 분석 -->
        <section>
            <div class="slide-container">
                <div class="left-content">
                    <h2>04.<br>Color & Distribution</h2>
                    <p>컬러 등급별 가치 분포 및 소비자 심리</p>
                    <div class="image-box">
                        <img src="diamond/images/price_violin_by_color.png" alt="Price Violin by Color">
                    </div>
                </div>
                <div class="right-content">
                    <div class="glass-card">
                        <i class="fas fa-palette card-icon"></i>
                        <span class="card-text">G 컬러가 11,292건으로 최다 분포를 보여 대중이 가장 선호하는 가성비 등급과 품질의 균형점을 형성하고 있는 핵심 모델군임임.</span>
                    </div>
                    <div class="glass-card">
                        <i class="fas fa-exclamation-triangle card-icon"></i>
                        <span class="card-text">가장 낮은 등급인 J 컬러의 평균 가격($5,323)이 최상위 D 컬러($3,169)보다 높은 기현상은 낮은 등급일수록 큰 중량의 상품이 많기 때문임임.</span>
                    </div>
                    <div class="glass-card">
                        <i class="fas fa-vial card-icon"></i>
                        <span class="card-text">D, E, F 컬러(Colorless) 등급은 소형 캐럿의 예물 시장을 타겟으로 하며 정교한 품질 관리를 통한 고마진 정책 유지가 유리함임.</span>
                    </div>
                    <div class="glass-card">
                        <i class="fas fa-adjust card-icon"></i>
                        <span class="card-text">I, J 컬러 등급의 넓은 바이올린 플롯 폭은 대형 캐럿 상품이 포함되어 있음을 의미하며 중량 위주 마케팅의 소구점이 강력함임.</span>
                    </div>
                    <div class="glass-card">
                        <i class="fas fa-medal card-icon"></i>
                        <span class="card-text">컬러 등급의 역설적 가격 형성을 고려할 때 소비자에게 등급보다는 '육안상의 크기'와 '희소성'을 강조하는 스토리텔링 마케팅 권장함임.</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- 슬라이드 6: 변수 간 상관관계 및 시사점 -->
        <section>
            <div class="slide-container">
                <div class="left-content">
                    <h2>05.<br>Feature Correlation</h2>
                    <p>물리적 변수와 가격의 인과관계</p>
                    <div class="image-box">
                        <img src="diamond/images/correlation_heatmap.png" alt="Correlation Heatmap">
                    </div>
                </div>
                <div class="right-content">
                    <div class="glass-card">
                        <i class="fas fa-ruler-combined card-icon"></i>
                        <span class="card-text">물리적 수치(x, y, z)와 캐럿 간의 상관관계가 0.95 이상으로 나타나 다이아몬드의 체적과 중량이 가격 결정의 핵심 동인임을 입증함임.</span>
                    </div>
                    <div class="glass-card">
                        <i class="fas fa-percentage card-icon"></i>
                        <span class="card-text">Depth와 Table 변수는 가격과의 상관관계가 낮아(-0.01, 0.12) 형태적 비율보다는 절대적인 크기가 상업적 가치에 더 크게 기여함임.</span>
                    </div>
                    <div class="glass-card">
                        <i class="fas fa-project-diagram card-icon"></i>
                        <span class="card-text">x, y, z 변수 간의 높은 선형성을 바탕으로 비정상적인 수치를 가진 데이터를 식별하여 품질 보증 및 감정의 자동화 가능성을 시사함임.</span>
                    </div>
                    <div class="glass-card">
                        <i class="fas fa-arrow-right card-icon"></i>
                        <span class="card-text">가격 결정 모델 수립 시 캐럿과 물리적 치수를 1순위 피처로 설정하고 Cut, Color 등을 보정 변수로 활용하는 예측 최적화 전략 유효함임.</span>
                    </div>
                    <div class="glass-card">
                        <i class="fas fa-bullseye card-icon"></i>
                        <span class="card-text">수치형 데이터의 상관관계가 명확하므로 머신러닝 기반 자동 가격 책정 시스템을 도입하여 온/오프라인 채널의 가격 일관성 확보 가능함임.</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- 슬라이드 7: 결론 및 제언 -->
        <section data-background="linear-gradient(135deg, #3b0764 0%, #0f172a 100%)">
            <div style="text-align: center;">
                <h2 style="font-size: 50px; border: none; text-align: center;">STRATEGIC RECOMMENDATIONS</h2>
                <div class="glass-card" style="display: inline-block; padding: 40px; margin-top: 30px;">
                    <p style="font-size: 24px;">품질 중심의 예물 시장과 중량 중심의 투자 시장 이원화 전략</p>
                </div>
                <ul style="list-style: none; margin-top: 50px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <li class="glass-card">데이터 기반의 실시간 가격 예측 엔진을 도입하여 재고 회전율을 높이고 시장 변동성에 유연하게 대응하는 선진 운영 체계의 구축임.</li>
                    <li class="glass-card">Ideal 세공과 최상위 컬러(D-F)를 결합한 프리미엄 라인을 고소득층 타겟으로 특화하여 브랜드 가치 및 수익 마진의 극대화 추진함임.</li>
                    <li class="glass-card">중량이 큰 상품군(1.5캐럿 이상)에서는 낮은 등급(SI2, I-J)을 적극적으로 소싱하여 합리적 가격의 대형 다이아몬드 수요를 선점함임.</li>
                    <li class="glass-card">전체 매출의 기반이 되는 $2,500 이하 상품군에 대해서는 최적화된 재고 관리와 정기 프로모션을 통한 시장 점유율의 안정적 확보임.</li>
                    <li class="glass-card">분석 결과를 영업 일선에 공유하여 고객에게 단순 등급이 아닌 실질적 가치(체적, 희소성)를 설명하는 데이터 스토리텔링 강화임.</li>
                </ul>
            </div>
        </section>

    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/reveal.js"></script>
<script>
    Reveal.initialize({
        hash: true,
        transition: 'fade',
        width: 1280,
        height: 720,
        margin: 0.1,
        center: true,
        controls: true,
        progress: true,
        slideNumber: 'c/t'
    });
</script>

</body>
</html>

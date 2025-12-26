import os
import seaborn as sns
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import textwrap

# 이 스크립트는 seaborn의 `diamonds` 데이터셋을 불러와
# 기초 기술 통계와 여러 시각화를 생성한 뒤,
# 결과 이미지들을 `diamond/images` 폴더에 저장하고
# 전체 분석 내용을 `diamond/diamonds_analysis.md` 하나의 마크다운 파일로 출력합니다.
#
# 실행 예시:
#   python3 diamond/eda_diamonds.py
#
# 생성 결과:
# - diamond/diamonds_analysis.md (마크다운 보고서)
# - diamond/images/*.png (시각화 이미지)


def ensure_dir(path):
    """주어진 경로의 디렉토리를 생성합니다 (이미 존재하면 무시).

    Args:
        path (str): 생성할 디렉토리 경로
    """
    os.makedirs(path, exist_ok=True)


def df_to_md_table(df):
    """데이터프레임을 마크다운 표 문자열로 변환합니다.

    pandas의 to_markdown이 없을 수 있어 예외 처리합니다.
    """
    try:
        return df.to_markdown()
    except Exception:
        return df.to_string()


def main():
    # 결과를 저장할 디렉토리 생성
    ensure_dir('diamond/images')
    out_md = []

    # seaborn의 diamonds 데이터셋 로드
    ds = sns.load_dataset('diamonds')

    # 마크다운 리포트 헤더
    out_md.append('# Seaborn Diamonds EDA Report')
    out_md.append('\n')

    # -------------------------
    # 1) 기초 기술 통계 (최소 5개 이상)
    # -------------------------
    out_md.append('## 기초 기술 통계')

    # 1) 전체 기술통계 (describe)
    out_md.append('### 1) 전체 기술통계 (describe)')
    desc = ds.describe()
    out_md.append('```\n{}\n```'.format(desc.to_string()))

    # 2) Price basic stats
    # 2) 가격(price) 요약 통계
    out_md.append('### 2) Price 요약 통계')
    price_stats = ds['price'].agg(['mean', 'median', 'std', 'min', 'max'])
    out_md.append('```\n{}\n```'.format(price_stats.to_string()))

    # 3) Carat basic stats
    # 3) 캐럿(carat) 요약 통계
    out_md.append('### 3) Carat 요약 통계')
    carat_stats = ds['carat'].agg(['mean', 'median', 'std', 'min', 'max'])
    out_md.append('```\n{}\n```'.format(carat_stats.to_string()))

    # 4) Cut counts
    # 4) 컷(cut) 분포
    out_md.append('### 4) Cut 분포 (value_counts)')
    cut_counts = ds['cut'].value_counts()
    out_md.append('```\n{}\n```'.format(cut_counts.to_string()))

    # 5) Color 분포
    # 5) 색상(color) 분포
    out_md.append('### 5) Color 분포 (value_counts)')
    color_counts = ds['color'].value_counts()
    out_md.append('```\n{}\n```'.format(color_counts.to_string()))

    # 6) 상관관계
    # 6) 수치형 변수들 간의 상관관계
    out_md.append('### 6) 수치형 변수 상관관계')
    corr = ds.select_dtypes(include=[np.number]).corr()
    out_md.append('```\n{}\n```'.format(corr.to_string()))

    # -------------------------
    # 2) 시각화 (최소 5개 이상)
    # - 각 시각화는 이미지로 저장하고, 하단에 관련 피벗/교차표(기술통계)를 출력합니다.
    # -------------------------
    sns.set(style='whitegrid')

    # 1) 가격 히스토그램: price 분포 확인
    plt.figure(figsize=(8,5))
    sns.histplot(ds['price'], bins=50, kde=True)
    p1 = 'diamond/images/price_hist.png'
    plt.title('Histogram of Price')
    plt.savefig(p1, bbox_inches='tight')
    plt.close()

    out_md.append('## 시각화 1: 가격 히스토그램')
    out_md.append('![]({})'.format(p1))
    pt1 = pd.pivot_table(ds, values='price', index='cut', aggfunc=['mean','median','count'])
    out_md.append('\n**Price by Cut (mean, median, count)**\n')
    out_md.append(df_to_md_table(pt1))

    # 2) 컷별 가격 박스플롯: 컷에 따른 가격 분포 및 이상치 확인
    plt.figure(figsize=(8,5))
    sns.boxplot(x='cut', y='price', data=ds)
    p2 = 'diamond/images/price_box_by_cut.png'
    plt.title('Price by Cut (Boxplot)')
    plt.savefig(p2, bbox_inches='tight')
    plt.close()

    out_md.append('## 시각화 2: Cut 별 가격 박스플롯')
    out_md.append('![]({})'.format(p2))
    pt2 = ds.groupby('cut')['price'].agg(['median','mean','std','min','max']).sort_index()
    out_md.append('\n**Cut 별 Price 통계 (median, mean, std, min, max)**\n')
    out_md.append(df_to_md_table(pt2))

    # 3) 캐럿 대비 가격 산점도(Clarity 색상): carat과 price의 관계 시각화
    plt.figure(figsize=(8,6))
    sns.scatterplot(x='carat', y='price', hue='clarity', data=ds, alpha=0.6)
    p3 = 'diamond/images/price_vs_carat_scatter.png'
    plt.title('Price vs Carat (colored by Clarity)')
    plt.savefig(p3, bbox_inches='tight')
    plt.close()

    out_md.append('## 시각화 3: Carat 대비 Price 산점도 (Clarity 색상)')
    out_md.append('![]({})'.format(p3))
    pt3 = ds.pivot_table(values=['price','carat'], index='clarity', aggfunc={'price':['mean','median','count'],'carat':'mean'})
    out_md.append('\n**Clarity 별 평균/중앙값/건수 (price) 및 평균 carat**\n')
    out_md.append(df_to_md_table(pt3))

    # 4) 컷 빈도 수(Countplot): 각 컷의 데이터 건수 확인
    plt.figure(figsize=(7,4))
    sns.countplot(x='cut', data=ds, order=ds['cut'].value_counts().index)
    p4 = 'diamond/images/cut_count.png'
    plt.title('Count of Each Cut')
    plt.savefig(p4, bbox_inches='tight')
    plt.close()

    out_md.append('## 시각화 4: Cut 빈도 수')
    out_md.append('![]({})'.format(p4))
    ct_cut = ds['cut'].value_counts().rename_axis('cut').reset_index(name='count').set_index('cut')
    out_md.append('\n**Cut 빈도표**\n')
    out_md.append(df_to_md_table(ct_cut))

    # 5) 색상별 가격 분포(바이올린 플롯): color에 따른 price 분포 확인
    plt.figure(figsize=(8,5))
    sns.violinplot(x='color', y='price', data=ds, order=sorted(ds['color'].unique()))
    p5 = 'diamond/images/price_violin_by_color.png'
    plt.title('Price distribution by Color (Violin)')
    plt.savefig(p5, bbox_inches='tight')
    plt.close()

    out_md.append('## 시각화 5: Color 별 Price 분포 (Violin)')
    out_md.append('![]({})'.format(p5))
    pt5 = ds.groupby('color')['price'].agg(['mean','median','std','count']).sort_index()
    out_md.append('\n**Color 별 Price 요약 통계**\n')
    out_md.append(df_to_md_table(pt5))

    # 6) 수치형 변수들 간 상관관계 히트맵
    plt.figure(figsize=(8,6))
    sns.heatmap(corr, annot=True, fmt='.2f', cmap='coolwarm')
    p6 = 'diamond/images/correlation_heatmap.png'
    plt.title('Correlation Heatmap (numeric)')
    plt.savefig(p6, bbox_inches='tight')
    plt.close()

    out_md.append('## 시각화 6: 수치형 변수 상관관계 히트맵')
    out_md.append('![]({})'.format(p6))
    out_md.append('\n**상관계수 행렬**\n')
    out_md.append('```\n{}\n```'.format(corr.to_string()))

    # Save markdown
    md_path = 'diamond/diamonds_analysis.md'
    with open(md_path, 'w', encoding='utf-8') as f:
        f.write('\n\n'.join(out_md))

    print('완료: 작성된 마크다운 파일 ->', md_path)
    print('그림 파일들은 diamond/images 에 저장되었습니다.')


if __name__ == '__main__':
    main()

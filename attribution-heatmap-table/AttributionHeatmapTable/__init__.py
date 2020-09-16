import pandas as pd
import numpy as np

import os
import streamlit as st
import streamlit.components.v1 as components

_RELEASE = False

if not _RELEASE:
    _attribution_heatmap_table = components.declare_component(
        "attribution_heatmap_table", url="http://localhost:3001",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _attribution_heatmap_table = components.declare_component("attribution_heatmap_table", path=build_dir)


def attribution_heatmap_table(data, fmt_data, key=None):
    return _attribution_heatmap_table(data=data, fmt_data=fmt_data, default=[], key=key)

if not _RELEASE:
    # scores = np.random.random(5)
    scores = [0.266161, 0.077638, 00.072882, 0.292981, 0.534820]
    attributions = {
        "Age": [0.266161, 0.077638, 00.072882, 0.292981, 0.534820],
        "Duration": [0.266161, 0.077638, 00.072882, 0.292981, 0.534820],
        "Credit Amount": [0.266161, 0.077638, 00.072882, 0.292981, 0.534820],
        "Score": scores,

    }
    df_attr = pd.DataFrame(attributions)

    features = {
        "Age": [32, 45, 40, 24, 50],
        "Duration": [20, 30, 31, 15, 19],
        "Credit Amount": [1000, 2000, 1500, 500, 800],
        "Score": scores,
    }
    df_features = pd.DataFrame(features)

    # send both data frames to frontend
    rows = attribution_heatmap_table(data=df_features, fmt_data=df_attr)
    if rows:
        st.write("You have selected", rows)

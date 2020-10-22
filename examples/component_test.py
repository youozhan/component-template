import streamlit as st
import streamlit.components.v1 as components

import time
import numpy as np

st.write("This is a paragraph")
st.info("Dataset info")
st.warning("Warning info")
st.error("Error info")
with st.spinner('Wait for it...'):
    time.sleep(5)
    st.success('Done!')
e = RuntimeError('This is an exception of type RuntimeError')
st.exception(e)

with st.beta_expander("Global Attributions"):
    st.write("This is inside the container")
    # You can call any Streamlit command, including custom components:
    st.bar_chart(np.random.randn(50, 3))
    st.write("This is outside the container")

with st.beta_expander("Global Attributions"):
    st.write("This is inside the container")
    # You can call any Streamlit command, including custom components:
    st.bar_chart(np.random.randn(50, 3))
    st.write("This is outside the container")

with st.beta_expander("Global Attributions", True):
    st.write("This is inside the container")
    # You can call any Streamlit command, including custom components:
    st.bar_chart(np.random.randn(50, 3))
    st.write("This is outside the container")



# total_case = 150
# top_factor = "Gender"
#
# kpi_html = f"""
#                 <div style="font-family: 'Open Sans'; display: flex; flex-direction: row;">
#                 <script>
#                     document.head.innerHTML +=
#                     '<link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">'
#                 </script>
#                 <div style="margin:0 2rem 0 0;">
#                     <div style="color: #D4D6DA;">
#                     Num of Cases
#                     </div>
#                     <div style="color: #FFFFFF; font-size: 2rem;">
#                     {total_case}
#                     </div>
#                 </div>
#                 <div style="margin-bottom: 0;">
#                     <div style="color: #D4D6DA;">
#                     Top Factor
#                     </div>
#                     <div style="color: #FFFFFF; font-size: 2rem;">
#                     {top_factor}
#                     </div>
#                 </div>
#                 </div>
#                 """
#
# components.html(kpi_html, height=80)
#
# list_html = ""
# feature_data = [{'name':"DELINQUINCIES", 'value':3},
#                 {'name':"OPEN ACCOUNTS", 'value':10},
#                 {'name':"DELINQUINCIES", 'value':3},
#                 {'name':"OPEN ACCOUNTS", 'value':10}
#             ]
#
# for d in feature_data:
#     list_html += f"<div style='width: fit-content; " \
#                  f"background: linear-gradient(246.65deg, #BDCDFF -17.53%, #D2F4D8 83.84%, #E0FFE7 104.88%); " \
#                  f"color: #555D9D; letter-spacing: 0.2em; border-radius: 2rem; " \
#                  f"padding: 0 1.5rem; margin-bottom: 0.5rem';>" \
#                  f"{d['name']} > {d['value']}</div>"
# full_html = f"""
#             <div style="font-family: 'Open Sans';">
#                 <script>
#                     document.head.innerHTML +=
#                     '<link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">'
#                 </script>
#                 <div style="color: white; margin-bottom: 1rem;">
#                 Among 50 similar cases which satisfy the following conditions, 100% were classified as bad
#                 </div>
#                 <div style="display: flex; flex-direction: column;">{list_html}</div>
#             </div>
#             """
#
# components.html(full_html, height=200)
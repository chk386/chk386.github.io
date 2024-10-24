def transform(input_str):
    if input_str is None or input_str == "":
        return input_str

    length = len(input_str)

    if length == 1:  # 한 글자일 경우
        return "*"
    elif length == 2:  # 두 글자일 경우
        return input_str[0] + "*"
    else:  # 세 글자 이상
        return input_str[0] + "*" * (length - 2) + input_str[-1]


# 테스트 입력
test_inputs = ["이", "이유", "이유미", "이유유미", "이유유유미"]

for input_str in test_inputs:
    output = transform(input_str)
    print(f"입력: {input_str} -> 출력: {output}")

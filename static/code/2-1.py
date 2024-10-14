# 띄워쓰기 단위로 분리
input_text = "나는 최근 파리 여행을 다녀왔다"
input_test_list = input_text.split()

print("input_test_list: ", input_test_list)

# 토큰 ->  아이디 딕셔너리와 아이디 ->  토큰 딕셔너리 만들기
str2idx = {word: idx for idx, word in enumerate(input_test_list)}
idx2str = {idx: word for idx, word in enumerate(input_test_list)}

print("str2idx: ", str2idx)
print("idx2str: ", idx2str)

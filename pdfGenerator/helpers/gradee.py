import sys
from imutils.perspective import four_point_transform
from imutils import contours
import numpy as np
import argparse
import imutils
import cv2
import json
from random import randint
# define the answer key which maps the question number
# to the correct answer

ANSWER_KEYS_INPUT = sys.argv[2].split(',')
imgURL = sys.argv[1]

ANSWERED = {}
ANSWER_KEY = {}

broi = 0
for ocenka in ANSWER_KEYS_INPUT:
    ANSWER_KEY[broi] = int(ocenka)
    broi += 1

image = cv2.imread(imgURL)
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
blurred = cv2.GaussianBlur(gray, (5,5), 0)
edged = cv2.Canny(blurred, 75, 200)

cnts = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL,
    cv2.CHAIN_APPROX_SIMPLE)

cnts = cnts[0] if imutils.is_cv2() else cnts[1]
docCnt = None

if len(cnts) > 0:
    cnts = sorted(cnts, key=cv2.contourArea, reverse=True)

    for c in cnts:
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.02 * peri, True)

        if len(approx) == 4:
            docCnt = approx
            break

paper = four_point_transform(image, docCnt.reshape(4,2))
warped = four_point_transform(gray, docCnt.reshape(4,2))

thresh = cv2.threshold(warped, 0, 255, #color 
    cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)[1]

cnts = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL,
    cv2.CHAIN_APPROX_SIMPLE)

cnts = cnts[0] if imutils.is_cv2() else cnts[1]

questionsCnts = []

for c in cnts:

    (x,y,w,h) = cv2.boundingRect(c)
    ar = w / float(h)

    if w >= 40 and h >= 40 and ar >= 0.9 and ar <= 1.1:
            questionsCnts.append(c)

questionsCnts = contours.sort_contours(questionsCnts,
    method="top-to-bottom")[0]
correct = 0

for(q, i) in enumerate(np.arange(0, len(questionsCnts), 4)):
    cnts = contours.sort_contours(questionsCnts[i:i + 4])[0]
    bubbled = None

    for (j, c) in enumerate(cnts):
        mask = np.zeros(thresh.shape, dtype="uint8")
        cv2.drawContours(mask, [c], -1, 255, -1)

        mask = cv2.bitwise_and(thresh, thresh, mask=mask)
        total = cv2.countNonZero(mask)

        if bubbled is None or total > bubbled[0]:
            bubbled = (total, j)
        
    color = (0, 0, 255)

    if q >= len(ANSWER_KEY):
        break
    
    k = ANSWER_KEY[q]

    ANSWERED[q] = False
    if k == bubbled[1]:
        color = (0, 255, 0)
        correct += 1
        ANSWERED[q] = True
    
    cv2.drawContours(paper, [cnts[k]], -1, color, 3)

score = (correct / len(ANSWER_KEYS_INPUT)) * 100

#This part prints something
cv2.putText(paper, "Results - {:.2f}%".format(score), (10, 30),
    cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)

cv2.putText(paper, "Correct - {}/{}".format(correct, len(ANSWER_KEYS_INPUT)), (10, 70),
    cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)

# print(ANSWERED)
# print(score)

randomId = randint(0, 10000)

cv2.imwrite('../generated/img-{}.png'.format(randomId), paper)

print(json.dumps({
    "Results": ANSWERED,
    "Score": score,
    "CheckedPic": 'img-{}.png'.format(randomId)
    }))
# cv2.imshow("Original", image)
#cv2.imshow("Exam", paper)
#cv2.waitKey(0)


#--coding=utf-8--
#author:xubing zhang

# 从第N行开始获取内容，可以对需要的列进行关键字映射，生成lua或者json文件/js文件

import  os,sys
import xlrd
import  codecs
import time, datetime
import plistlib
import string
import sys
import zipfile
import shutil
import json
import codecs

reload(sys)
sys.setdefaultencoding('utf-8')


# keyindex 作为 keyf
def generageLua(rowsContent,rowMap,keyindex):

    rowTotalStr = ""
    for row in rowsContent:
        if len(row) < len(rowMap):
            print "your template is wrong"
            return False
        # print row,keyindex,rowMap,startcolomnindex,endIndex
        # print "row",row,keyindex
        cotentStr = dealOneRow(row,rowMap,keyindex)
        if rowTotalStr != "":
            rowTotalStr = rowTotalStr + ","
        rowTotalStr =  rowTotalStr + cotentStr +"\n"
    totalstr = "return {%s}"%(rowTotalStr)
    # print totalstr
    return totalstr

#生成 { ['xxx'] = {x=1,y=2,z=3}}
# keyindex 作为 key
def dealOneRow(oneRow,rowMap,keyindex):
    rowContent = ""
    print "dealOneRow",oneRow,len(oneRow)
    for i in range(0, len(oneRow)):
        value = oneRow[i]
        key = rowMap[i]
        if rowContent != "":
            rowContent = rowContent + ","
        content = """\n ["%s"]="%s" """ %(key,str(value))
        print "content:",content
        rowContent = rowContent +content    
    cotentStr = """ ["%s"] = {%s} """ % (oneRow[keyindex], rowContent)
    #mkdirs(oneRow[keyindex])
    #gitpush(oneRow[keyindex])
    return cotentStr

def readExcel(excelPath,sheetName,startrow = 0,rowendindex=100):
    rowscontent = []
    err = False
    if os.path.exists(excelPath):
        workbook = xlrd.open_workbook(excelPath)
        sheet_names = workbook.sheet_names()
        print "sheet_names:",sheet_names
        if sheetName in sheet_names:
            sheet = workbook.sheet_by_name(sheetName)
            print "find sheet",sheetName
            print "sheet nrows,",sheet.nrows,' number:', sheet.number
            if rowendindex ==0 :
                rowendindex  = sheet.nrows
            for i in range(sheet.nrows):
                if i >= startrow and i <= rowendindex:
                    rows = sheet.row_values(i)  # 获取第i行内容
                    rowscontent.append(rows)
                    print rows
        else:
            print "there is no sheet named:",sheetName
            err = True

    else:
        print "there is no file at: ",excelPath
        err = True
    return rowscontent,err

def saveFile(fullPath, str):
    outfile = codecs.open(fullPath, "w", "utf-8")
    outfile.write(str)
    outfile.close()

def doit(excelPath,sheetName,luaFilePath,columnMap,rowstartindex,rowendindex):
    rowscontent, err = readExcel(excelPath,sheetName,rowstartindex,rowendindex)
    print "rowscontent",rowscontent
    if err:
        return
    else:
        pass
        # totalLua = generageLua(rowscontent,columnMap,0)
        # saveFile(luaFilePath, totalLua)

def mkdirs(packageName):
    cmd = "adb shell mkdir -p sdcard/"+packageName
    os.system(cmd)

def gitpush(packageName):
    plistPath = "/Users/bing/Slots3.3/src/config.plist"
    contents = plistlib.readPlist(plistPath)
    print "contents:",contents
    contents['package'] = packageName
    plistlib.writePlist(contents,plistPath)
    dir = "/Users/bing/Slots3.3"
    os.chdir(dir)
    cmd = "python push.py"
    os.system(cmd)


def converLineConfig(excelPath,savepath):
    # '1':{type: 1, b: ['0', '1D2', '0', '1D2', '0'], bar: [0, 0, 0, 0, 0], i: ['0', '0', '0', '0', '0']},

    ret = parseOneSheetLineConfig(excelPath,'block')
    convertoJs(ret,savepath)

def parseOneSheetLineConfig(excelPath,sheetName):

    rowstartindex = 1
    rowendindex = 0
    rowscontent, err = readExcel(excelPath, sheetName, rowstartindex, rowendindex)

    config = {}
    for item in rowscontent:
        group,lineindex,lineconfig =  parseLineConfig(item)
        if not config.get(group):
            config[group] =[]
        config[group].append(lineconfig)
    return config


def str2f(str):
    ret = str2str(str)
    if ret == "":
        return 0.0

    return float(ret)


def str2i(str):
    print "str2i",str,type(str)
    ret = str2str(str)
    if ret == "":
        return 0
    return int(float(ret))

# float unicode -》str。 if str == '0.0'，change to '0'
def str2str(strin):

    print 'str',strin,type(strin), strin == '0.0',type(strin) == float
    retstr =strin
    if type(strin) == float:
        retstr = str(strin)
    elif type(strin) == unicode:
        retstr = strin.encode("utf-8")

    if(retstr == '0.0'):
        return '0'
    else:
        return retstr

def parseLineConfig(content):

    index = 0
    lineindex = content[index].encode("utf-8")
    lineindexs = lineindex.split("#")

    #b0-b4
    index += 1
    g0 = str2i(content[index])
    index += 1
    g1 = str2i(content[index])
    index += 1
    g2 = str2i(content[index])
    index += 1
    g3 = str2i(content[index])
    index += 1
    g4 = str2i(content[index])
    g = [g0, g1, g2, g3, g4]

    return lineindexs[0],lineindexs[1],g
    # lineindex = content[0].splite('#')
    # print lineindex
    # for item in content:
    #     print item



def parseBlockConfig(content):
    ret = {}
    key = str2i(content[0])
    ret['id'] = str(key)
    ret['rate1'] = str2i(content[1])
    ret['rate2'] = str2i(content[2])
    ret['rate3'] = str2i(content[3])
    ret['rate4'] = str2i(content[4])
    ret['rate5'] = str2i(content[5])
    ret['rate6'] = str2i(content[6])
    ret['rate7'] = str2i(content[7])
    ret['rate8'] = str2i(content[8])
    ret['rate9'] = str2i(content[9])
    ret['rate10'] = str2i(content[10])
    ret['rate11'] = str2i(content[11])
    ret['rate12'] = str2i(content[12])
    ret['rate13'] = str2i(content[13])

    return ret['id'], ret
def parseSpeedConfig(content):
    ret = {}
    key = str2i(content[0])
    ret['id'] = str(key)
    ret['score'] = str2i(content[1])
    ret['time'] = str2f(content[2])

    return ret['id'], ret

def parseCoinConfig(content):
    ret = {}
    key = str2i(content[1])
   # ret['id'] = str(key)
    ret['block'] = str(key)
    ret['rate'] = str2i(content[2])

    return ret['block'], ret
def parseRewardConfig(content):

    ret = {}
    key = str(str2i(content[0]))
    # ret['id'] = key
    # 1 for design
    ret['coin'] = str2i(content[2])
    return key,ret

# 
def parseInviteConfig(content):

    ret = {}
    key = str2i(content[0])
    ret['id'] = key
    # 1 for design
    ret['num'] = str2i(content[2])
    ret['rewardid'] = str2i(content[3])
    return key,ret

def parseSigninConfig(content):

    ret = {}
    key = str2i(content[0])
    ret['id'] = key
    # 1 for design
    ret['retrieve'] = str2i(content[2])
    ret['rewardid'] = str2i(content[3])
    return key,ret



def converSpeedConfig(excelPath, savepath):
    rowstartindex = 1
    rowendindex = 0
    sheetName = 'speed'
    rowscontent, err = readExcel(excelPath, sheetName, rowstartindex, rowendindex)

    config = {}
    for item in rowscontent:
        index, c = parseSpeedConfig(item)
        config[index] = c

    print 'config', config
    convertoJs(config, savepath)


def converBlockConfig(excelPath, savepath):
    rowstartindex = 1
    rowendindex = 0
    sheetName = 'block'
    rowscontent, err = readExcel(excelPath, sheetName, rowstartindex, rowendindex)

    config = {}
    for item in rowscontent:
        index, c = parseBlockConfig(item)
        config[index] = c

    print 'config', config
    convertoJs(config, savepath)

def converCoinConfig(excelPath, savepath):
    rowstartindex = 1
    rowendindex = 0
    sheetName = 'coin'
    rowscontent, err = readExcel(excelPath, sheetName, rowstartindex, rowendindex)

    config = {}
    for item in rowscontent:
        index, c = parseCoinConfig(item)
        config[index] = c

    print 'config', config
    convertoJs(config, savepath)


def converRewardConfig(excelPath,savepath):
    rowstartindex = 1
    rowendindex = 0
    sheetName = 'reward'
    rowscontent, err = readExcel(excelPath, sheetName, rowstartindex, rowendindex)
    config = {}
    for item in rowscontent:
        k,c = parseRewardConfig(item)
        config[k] = c
    print 'config',config
    convertoJs(config, savepath)

def converInviteConfig(excelPath,savepath):
    rowstartindex = 1
    rowendindex = 0
    sheetName = 'invite'
    rowscontent, err = readExcel(excelPath, sheetName, rowstartindex, rowendindex)
    config = {}
    config["invite"] = []
    for item in rowscontent:
        k,c = parseInviteConfig(item)
        config['invite'].append(c)
    print 'config',config
    convertoJs(config, savepath)

def converSigninConfig(excelPath,savepath):
    rowstartindex = 1
    rowendindex = 0
    sheetName = 'signin'
    rowscontent, err = readExcel(excelPath, sheetName, rowstartindex, rowendindex)
    config = {}
    config['Signin'] = []
    for item in rowscontent:
        k,c = parseSigninConfig(item)
        config['Signin'].append(c)
    print 'config',config
    convertoJs(config, savepath)
       
def convertoJs(content,savefile='test.js'):
    json_string = json.dumps(content)
    print json_string

    SlotConfigContent = """\n//ren \n//这个文件是根据脚本自动生成，修改无效。\nmodule.exports = %s;""" % (json_string)

    SlotConfigContentFile = codecs.open(savefile, "w", "utf-8")
    SlotConfigContentFile.write(SlotConfigContent)
    SlotConfigContentFile.close()
    print "\033[6;30;46m", " genereate  finished %s " % (savefile), "\033[0m"



def converTank():

    # print str2i("")
    # return

    excelPath = """/Users/bolex1/work/game/doc/2048/gameconfig.xlsx"""

   
    basePath = "/Users//bolex1/work/game/2048/2048/assets/src/config/"


    # cycle config
    savepath = "BlockConfig.js"
    converBlockConfig(excelPath, basePath+savepath)
    # speed config
    savepath = "SpeedConfig.js"
    converSpeedConfig(excelPath, basePath+savepath)

    # speed config
    savepath = "CoinConfig.js"
    converCoinConfig(excelPath, basePath+savepath)
   # reward config
    savepath = "RewardConfig.js"
    converRewardConfig(excelPath, basePath+savepath)


    savepath = "InviteConfig.js"
    converInviteConfig(excelPath, basePath+savepath)

    savepath = "DailyBonusConfig.js"
    converSigninConfig(excelPath, basePath+savepath)

   


if __name__ == "__main__":

    # gitpush("BING.BING.BING")

    # mkdirs("test")

    converTank()


    # excelPath = "/Users/bing/Desktop/excel/w1.xlsx"
    # sheetName = "adcolony"
    # luaRowMap = ['appname', 'package','APPID', 'AdZoneID', 'VideoZoneID'] # AdZoneID-》ad     VideoZoneID-》video
    # keyindex = 1
    # luaFilePath = "/Users/bing/Slots3.3/src/AdcolonyConfig.lua"
    # dotest(excelPath, sheetName, luaRowMap, keyindex,luaFilePath,1,len(luaRowMap))

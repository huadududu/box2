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

def parseItemConfig(content):
    # {
    #
    #     '10000': {name: '无敌', type: 1, icon: 'i_10000.png', time: 5},
    #     '10001': {name: '身体', type: 2, icon: '', time: 0},
    #     '10002': {name: '单排子弹', type: 3, icon: 'i_10002.png', time: 0},
    #     '10003': {name: '双排子弹', type: 4, icon: 'i_10003.png', time: 0},
    #     '10004': {name: '子弹频率双倍', type: 5, icon: 'i_10004.png', time: 0},
    #
    # };

    # excel 10000	无敌	1	i_10000.png	10	持续10秒
    # type
    ret = {}
    key = str2str(str2i(content[0]))
    ret['name'] = str2str(content[1])
    ret['type'] =  str2i(content[2])
    ret['icon'] = str2str(content[3])
    ret['time'] = str2f(content[4])

    return key,ret


def parseSpeedConfig(content):
    score = str2i(content[0])
    v = str2f(content[1])
    return score,v

def parsePositionConfig(content):

    ret = {}
    key = str2str(content[0])
    ret['min'] = str2i(content[1])
    ret['max'] = str2i(content[2])
    return key,ret

def parseLevelConfig(content):
    ret = {}
    key = str2i(content[0])
    ret['id'] = str(key)
    ret['exp'] = str2i(content[1])
    ret['rewardcoin'] = str2i(content[2])
    return ret['id'], ret

def parseStageConfig(content):
    ret = {}
    key = str2i(content[0])
    ret['id'] = str(key)
    ret['box'] = str2str(content[1])
    ret['layer'] = str2i(content[2])
    ret['size'] = str2i(content[3])
    ret['top'] = str2i(content[4])
    ret['cycleID'] = str2str(content[5])

    return ret['id'], ret

def parseCycleConfig(content):
    ret = {}
    key = str2i(content[0])
    ret['id'] = str(key)
    ret['size'] = str2i(content[1])
    ret['block1'] = str2i(content[2])
    ret['num1'] = str2i(content[3])
    ret['block2'] = str2i(content[4])
    ret['num2'] = str2i(content[5])
    ret['block3'] = str2i(content[6])
    ret['num3'] = str2i(content[7])
    ret['block4'] = str2i(content[8])
    ret['num4'] = str2i(content[9])
    ret['block5'] = str2i(content[10])
    ret['num5'] = str2i(content[11])
    ret['block6'] = str2i(content[12])
    ret['num6'] = str2i(content[13])
    ret['block7'] = str2i(content[14])
    ret['num7'] = str2i(content[15])
    ret['block8'] = str2i(content[16])
    ret['num8'] = str2i(content[17])
    ret['block9'] = str2i(content[18])
    ret['num9'] = str2i(content[19])
    ret['block10'] = str2i(content[20])
    ret['num10'] = str2i(content[21])

    return ret['id'], ret

def parseBlockConfig(content):
    ret = {}
    key = str2i(content[0])
    ret['id'] = str(key)
    ret['size'] = str2i(content[1])
    ret['resources'] = str2str(content[2])
    ret['texiao'] = str2str(content[3])

    return ret['id'], ret

def parseAcceleratorConfig(content):
    ret = {}
    key = str2i(content[0])
    ret['id'] = str(key)
    ret['name'] = str2str(content[1])
    ret['title'] = str2i(content[2])
    ret['icon'] = str2str(content[3])
    ret['speed'] = str2i(content[4])
    ret['coin'] = str2i(content[5])
    ret['time'] = str2i(content[6])
    ret['desc'] = str2i(content[7])
    ret['checkdes'] = str2str(content[8])

    return ret['id'], ret

def parseToolConfig(content):
    ret = {}
    key = str2i(content[0])
    ret['id'] = str(key)
    ret['name'] = str2str(content[1])
    ret['title'] = str2i(content[2])
    ret['icon'] = str2str(content[3])
    ret['animation'] = str2str(content[4])
    ret['attribute'] = str2i(content[5])
    ret['unlock'] = str2str(content[6])
    ret['locked'] = str2str(content[7])

    return ret['id'], ret

def parseAttributeConfig(content):
    ret = {}
    key = str2i(content[0])
    ret['id'] = str(key)
    ret['relate'] = str2str(content[1])
    ret['next'] = str2i(content[2])
    ret['att'] = str2i(content[3])
    ret['time'] = str2str(content[4])
    ret['cost'] = str2i(content[5])
    ret['costtype'] = str2i(content[6])
    ret['desc'] = str2i(content[7])
    ret['checkdes'] = str2str(content[8])
    return ret['id'], ret

def parseEfficiencyConfig(content):
    ret = {}
    key = str2i(content[0])
    ret['id'] = str(key)
    ret['name'] = str2str(content[1])
    ret['title'] = str2i(content[2])
    ret['type'] = str2i(content[3])
    ret['coin'] = str2i(content[4])
    ret['jumptime'] = str2i(content[5])
    ret['time'] = str2i(content[6])
    ret['cost'] = str2i(content[7])
    ret['costtype'] = str2i(content[8])
    ret['desc'] = str2i(content[9])
    ret['checkdes'] = str2str(content[10])
    return ret['id'], ret


def parseBoxConfig(content):
    ret = {}
    key = str2i(content[0])
    ret['id'] = str(key)
    ret['icon'] = str2str(content[1])
    ret['animation'] = str2str(content[2])
    ret['reward'] = str2i(content[3])

    return ret['id'], ret


def parseRewardConfig(content):
    ret = {}
    key = str2i(content[0])
    ret['id'] = str(key)
    ret['name'] = str2str(content[1])
    ret['num'] = str2i(content[2])
    ret['item1'] = str2str(content[3])
    ret['rate1'] = str2i(content[4])

    ret['item2'] = str2str(content[5])
    ret['rate2'] = str2i(content[6])

    ret['item3'] = str2str(content[7])
    ret['rate3'] = str2i(content[8])

    ret['item4'] = str2str(content[9])
    ret['rate4'] = str2i(content[10])

    ret['item5'] = str2str(content[11])
    ret['rate5'] = str2i(content[12])

    ret['item6'] = str2str(content[13])
    ret['rate6'] = str2i(content[14])

    return ret['id'], ret


def parseSignInviteConfig(content):
    ret = {}
    key = str2i(content[0])
    ret['id']= str(key)
    ret['name'] = str2str(content[1])
    ret['item'] = str2i(content[2])
    ret['num'] = str2i(content[3])

    return ret['id'], ret

def parseItemConfig(content):
    ret = {}
    key = str2i(content[0])
    ret['id'] = str(key)
    ret['name'] = str2str(content[1])
    ret['icon'] = str2str(content[2])

    return ret['id'], ret

def parseLanguageConfig(content):
    ret = {}
    key = str2i(content[0])
    ret['id'] = str(key)
    ret['Chinese'] = str2str(content[1])
    ret['English'] = str2str(content[2])
    ret['Japanese'] = str2str(content[3])

    return ret['id'], ret



#
#
#
#
def converLevelConfig(excelPath,savepath):
    rowstartindex = 1
    rowendindex = 0
    sheetName = 'level'
    rowscontent, err = readExcel(excelPath, sheetName, rowstartindex, rowendindex)

    config = {}
    for item in rowscontent:
        index, c = parseLevelConfig(item)
        config[index] = c

    print 'config', config
    convertoJs(config, savepath)


def converStageConfig(excelPath,savepath):
    rowstartindex = 1
    rowendindex = 0
    sheetName = 'stage'
    rowscontent, err = readExcel(excelPath, sheetName, rowstartindex, rowendindex)

    config = {}
    for item in rowscontent:
        index, c = parseStageConfig(item)
        config[index] = c

    print 'config', config
    convertoJs(config, savepath)


def converCycleConfig(excelPath, savepath):
    rowstartindex = 1
    rowendindex = 0
    sheetName = 'cycle'
    rowscontent, err = readExcel(excelPath, sheetName, rowstartindex, rowendindex)

    config = {}
    for item in rowscontent:
        index, c = parseCycleConfig(item)
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

def converAcceleratorConfig(excelPath, savepath):
    rowstartindex = 1
    rowendindex = 0
    sheetName = 'accelerator'
    rowscontent, err = readExcel(excelPath, sheetName, rowstartindex, rowendindex)

    config = {}
    for item in rowscontent:
        index, c = parseAcceleratorConfig(item)
        config[index] = c

    print 'config', config
    convertoJs(config, savepath)

def converToolConfig(excelPath, savepath):
        rowstartindex = 1
        rowendindex = 0
        sheetName = 'tool'
        rowscontent, err = readExcel(excelPath, sheetName, rowstartindex, rowendindex)

        config = {}
        for item in rowscontent:
            index, c = parseToolConfig(item)
            config[index] = c

        print 'config', config
        convertoJs(config, savepath)

def converAttributeConfig(excelPath, savepath):
        rowstartindex = 1
        rowendindex = 0
        sheetName = 'attribute'
        rowscontent, err = readExcel(excelPath, sheetName, rowstartindex, rowendindex)

        config = {}
        for item in rowscontent:
            index, c = parseAttributeConfig(item)
            config[index] = c

        print 'config', config
        convertoJs(config, savepath)



def converEfficiencyConfig(excelPath, savepath):
        rowstartindex = 1
        rowendindex = 0
        sheetName = 'efficiency'
        rowscontent, err = readExcel(excelPath, sheetName, rowstartindex, rowendindex)

        config = {}
        for item in rowscontent:
            index, c = parseEfficiencyConfig(item)
            config[index] = c

        print 'config', config
        convertoJs(config, savepath)
        


def converBoxConfig(excelPath, savepath):
    rowstartindex = 1
    rowendindex = 0
    sheetName = 'box'
    rowscontent, err = readExcel(excelPath, sheetName, rowstartindex, rowendindex)

    config = {}
    for item in rowscontent:
        index, c = parseBoxConfig(item)
        config[index] = c

    print 'config', config
    convertoJs(config, savepath)

def converRewardConfig(excelPath, savepath):
    rowstartindex = 1
    rowendindex = 0
    sheetName = 'reward'
    rowscontent, err = readExcel(excelPath, sheetName, rowstartindex, rowendindex)

    config = {}
    for item in rowscontent:
        index, c = parseRewardConfig(item)
        config[index] = c

    print 'config', config
    convertoJs(config, savepath)

def converSignInviteConfig(excelPath, savepath):
    rowstartindex = 1
    rowendindex = 0
    sheetName = 'signinvite'
    rowscontent, err = readExcel(excelPath, sheetName, rowstartindex, rowendindex)

    config = {}
    for item in rowscontent:
        index, c = parseSignInviteConfig(item)
        config[index] = c

    print 'config', config
    convertoJs(config, savepath)

def converItemConfig(excelPath, savepath):
    rowstartindex = 1
    rowendindex = 0
    sheetName = 'item'
    rowscontent, err = readExcel(excelPath, sheetName, rowstartindex, rowendindex)

    config = {}
    for item in rowscontent:
        index, c = parseItemConfig(item)
        config[index] = c

    print 'config', config
    convertoJs(config, savepath)
def converLanguageConfig(excelPath, savepath):
    rowstartindex = 1
    rowendindex = 0
    sheetName = 'language'
    rowscontent, err = readExcel(excelPath, sheetName, rowstartindex, rowendindex)

    config = {}
    for item in rowscontent:
        index, c = parseLanguageConfig(item)
        config[index] = c

    print 'config', config
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

    excelPath = """/Users/bolex1/work/game/doc/daddy's treasure/gameconfig.xlsx"""

   
    basePath = "/Users//bolex1/work/game/box/box/assets/src/config/"
     # level
    savepath = "LevelConfig.js"
    converLevelConfig(excelPath,basePath + savepath)


     # stage
    savepath = "StageConfig.js"
    converStageConfig(excelPath,basePath + savepath)

    # cycle config
    savepath = "CycleConfig.js"
    converCycleConfig(excelPath, basePath+savepath)

    # block config
    savepath = "BlockConfig.js"
    converBlockConfig(excelPath, basePath+savepath)

    # accelerator
    savepath = "AcceleratorConfig.js"
    converAcceleratorConfig(excelPath, basePath+savepath)

    # tool config
    savepath = "ToolConfig.js"
    converToolConfig(excelPath, basePath + savepath)

    # attribute config
    savepath = "AttributeConfig.js"
    converAttributeConfig(excelPath, basePath + savepath)

    # efficiency config
    savepath = "EfficiencyConfig.js"
    converEfficiencyConfig(excelPath, basePath + savepath)

    # box config
    savepath = "BoxConfig.js"
    converBoxConfig(excelPath, basePath + savepath)

    # box config
    savepath = "RewardConfig.js"
    converRewardConfig(excelPath, basePath + savepath)

    #signinvate conifg
    savepath = "SignInviteConfig.js"
    converSignInviteConfig(excelPath, basePath + savepath)

    # item config
    savepath = "ItemConfig.js"
    converItemConfig(excelPath, basePath + savepath)


     # language config
    savepath = "LanguageConfig.js"
    converLanguageConfig(excelPath, basePath + savepath)


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

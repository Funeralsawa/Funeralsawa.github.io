const r=`# DRF\r
\r
**Django Rest Framework**\r
\r
## API接口\r
\r
- 市面上大部分公司开发人员使用的接口规范主要有：\`restful\`、\`RPC\`\r
\r
### RPC[了解]\r
\r
RPC(Remote Procedure Call)，这种接口一般以服务或者过程式代码提供。\r
\r
- 服务器提供一个**唯一的访问入口地址**\r
\r
- 客户端请求服务端的时候，所有的操作都理解为**动作(action)**，如果是web开发时，对应的就是\`Http\`请求的\`post\`请求。\r
\r
- 通过**请求体**参数，指定要调用的接口名称和接口所需的参数。\r
\r
    \`\`\`http\r
    http://api.xxx.com/?action=get_all_student&class=301&sex=1\r
    \`\`\`\r
\r
- 基本上实现RPC的数据传输格式：\`protobuf(GO语言的gRPC框架衍生)\` 、\`json\`、\`xml\`\r
\r
**优点**：\`RPC\`的有点很明显，因为是单一入口，所以容易实现一些垂直业务，类似权限，限流，同时因为\`rpc\`直接通过请求体或请求参数直接表达对服务器的操作，所以相对比较直观，而且因为函数名都是开发者自定义的，非常灵活。\r
\r
**缺点**：缺点是当\`RPC\`的接口多了，对应的函数名和参数也就多了，客户端在请求服务器的\`api\`接口时就比较难找，对于年代久远的\`RPC\`服务端代码也容易出现重复的接口。\r
\r
\r
\r
### Restful[掌握]\r
\r
Restful是多入口的，它把服务端提供的所有数据/文件都看成资源，那么通过\`API\`接口向服务端请求数据的操作，本质上来说就是对资源的操作了。因此Restful中要求当前接口对外提供对哪种资源的操作，就<font color=red>**把资源名称写在\`url\`地址**</font>。而被操作的资源就是资源状态的转换。如：\r
\r
\`\`\`http\r
http://xxx.yyy.com/api/settings/students/get_student_names/\r
\`\`\`\r
\r
简单而言：\r
\r
- <font color=red>**把资源名称写在\`url\`地址**</font>\r
- <font color=red>**要严格按照\`Http\`请求方法来操作资源**</font>\r
\r
\`Http\`请求方法分类：\r
\r
\`\`\`http\r
POST 	添加某一个数据\r
GET 	获取某一个数据\r
DELETE 	删除某一个数据\r
PUT 	修改某一个数据\r
PATCH 	修改某个数据的部分信息\r
OPTIONS 获取信息，关于资源的哪些属性是客户端可以改变的\r
\`\`\`\r
\r
#### 详细规范\r
\r
REST，全称是\`Representation State Transfer\`，首次出现在2000年Roy Fielding的博士论文中。\r
\r
\`Restful\`是一种专门为web开发而定义的\`API\`接口风格，尤其适用于前后端分离的应用模式中。\r
\r
并非所有规范都需要要被严格遵守，而是有选择性地去遵守即可。\r
\r
- ==域名==\r
\r
    应该尽量把\`API\`项目部署在专用域名之下。\r
\r
    \`\`\`http\r
    https://api.example.com/api/\r
    \`\`\`\r
\r
- ==版本(version)==\r
\r
    应该将\`API\`的版本号放入\`URL\`或请求头中。\r
\r
    \`\`\`http\r
    https://api.example.com/api/1.0/foo\r
    \`\`\`\r
\r
    \`\`\`http\r
    https://api.example.com/api/2.0/foo\r
    \`\`\`\r
\r
- ==路径(Endpoint)==\r
\r
    路径又称为终点。表示\`API\`的具体网址，每个网址代表一种资源\r
\r
    1. **资源作为网址，只能有名词不能有动词，而且所用名词往往与数据库表名对应**\r
\r
        \`\`\`http\r
        /getProduct\r
        \`\`\`\r
\r
    2. **API当中的名词应该使用复数，无论子资源或者所有资源**\r
\r
        \`\`\`http\r
        http://www.example.com/api/AppName/resr/products/1\r
        \`\`\`\r
\r
- ==**Http动词(请求方法)**==\r
\r
    对于资源的具体类型，由动词来表示\r
\r
    \`\`\`http\r
    https://api.example.com/api/1.0/GET/zoos	列出所有动物园\r
    \`\`\`\r
\r
- ==过滤信息(Filtering)==\r
\r
    如果记录数量很多，服务器不能把它们全返回给用户。\`API\`应该提供参数，过滤返回结果。\r
\r
- ==状态码(Status Codes)==\r
\r
    - 1xx：表示当前请求持续中，没结束\r
    - 2xx：表示当前请求成功\r
    - 3xx：表示当前请求成功，但是服务器进行代理操作\r
    - 4xx：表示当前请求失败，主要是客户端发生了错误\r
    - 5xx：表示当前请求失败，主要是服务器发生了错误\r
\r
- ==错误处理(Error handling)==\r
\r
    如果状态码是4xx或者5xx，服务端应该向用户返回出错信息，一般来说返回信息中将\`error\`作为键名，出错信息作为键值即可。一般格式是\`json\`。\r
\r
    \`\`\`json\r
    {\r
        error: "Invalid API key"\r
    }\r
    \`\`\`\r
\r
- ==返回结果(Result)==\r
\r
    \`Restful\`针对不同操作，服务器向用户返回的结果应该符合以下规范。\r
\r
    - \`GET/collections\`：返回资源对象的列表\r
    - \`GET/collections/ID\`：返回单个资源字典\r
    - \`POST/collections\`：返回新生成的资源字典\`json\`\r
    - \`PUT/collections/ID\`：返回修改后的资源字典\`json\`\r
    - \`DELETE/collections/ID\`：返回一个空文档（空字符串，空字典）\r
\r
- ==超媒体(Hypermedia API)==\r
\r
    \`Restful\`规范最好做到在返回结果中提供链接，连向其他\`API\`方法，使用户不查文档也可以知道下一步应该做什么。例如\`Github\`的\`API\`就是这种设计。访问[api.github.com](https://api.github.com)会得到一个所有可用的\`API\`的网址列表。\r
\r
    \`\`\`json\r
    {\r
        'current_url': "https://api.github.com/user",\r
        'authorizations_url': "https://api.github.com/authorizations"\r
    }\r
    \`\`\`\r
\r
- ==其他==\r
\r
    服务端返回的数据格式应该尽量使用\`json\`，避免使用\`xml\` 。\r
\r
    \r
\r
#### **\`API\`接口的幂等性**\r
\r
\`API\`接口实现过程中会存在幂等性问题。也就是指客户端多次发起同样请求时是否对于服务端里的资源产生不同的结果。如果多次请求服务端结果一样，则是**幂等接口**，否则是**非幂等接口**。\r
\r
一般而言，\`Http\`方法的幂等性如下：\r
\r
| 请求方式  | 是否幂等 | 是否安全 |\r
| --------- | -------- | -------- |\r
| GET       | 幂等     | 安全     |\r
| POST      | 不幂等   | 不安全   |\r
| PUT/PATCH | 幂等     | 不安全   |\r
| DELETE    | 幂等     | 不安全   |\r
\r
- 针对幂等不安全的接口，要进行参数的校验\r
- 针对不幂等不安全的接口，要做幂等性校验（增加唯一性判断）\r
\r
*所谓幂等性校验，就是避免同一个接口反复提交*\r
\r
==幂等性校验方式==\r
\r
1. 增加唯一判断，给提交的数据字段设置唯一索引\r
2. 给提交的数据增加一个随机数或者\`uuid\`，如果两次数据的随机数一样则表示重复提交\r
3. 限流，或者强制刷新\r
\r
\r
\r
## 序列化与反序列化\r
\r
\`API\`接口开发，最核心常见的一个代码编写过程就是序列化，所谓序列化就是把数据转换格式变成\`json\`、\`pickle\`、\`base64\`等等。\r
\r
序列化可以分成两个阶段：\r
\r
1. **序列化**：把识别的数据转成指定格式提供给别人。\r
\r
    例如：\`django\`中获取的数据默认是模型对象，但是模型对象数据无法直接提供给前端或者别的平台使用所以需要把数据进行序列化变成字符串或者\`json\`数据提供给别人。\r
\r
2. **反序列化**：把别人提供的数据转换还原成我们需要的数据格式。\r
\r
    例如：前端提供的\`json\`数据对\`python\`而言就是字符串，需要反序列化成字典。\r
\r
\r
\r
## DRF概述\r
\r
DRF（Django Rest Framework），是一个建立在\`Django\`之上的web应用子框架，可以快速地开发\`REST API\`接口应用。在\`DRF\`中提供了序列化器\`Serialzier\`的定义，可以帮助我们简化序列化和反序列的过程，并且为我们提供了丰富的类视图、扩展类、视图集来简化视图的编写工作。\`DRF\`还提供了认证、权限、限流、过滤、分页、接口文档等功能的支持。\`DRF\`还提供了一个测试\`API\`接口的可视化界面。\r
\r
\r
\r
##  前提环境\r
\r
DRF需要以下依赖：\r
\r
- python3 (3.5以上)\r
- Django (2.2以上)\r
\r
\r
\r
## 安装\r
\r
\`\`\`python\r
pip install djangorestframework\r
\r
#在settings.py中增加应用\r
INSTALLED_APPS = [\r
    ...\r
    'rest_framework',\r
]\r
\`\`\`\r
\r
\r
\r
\r
\r
## 序列化器Serializer\r
\r
### 作用\r
\r
1. **序列化**：序列化器会把模型对象转换成字典，经过视图中的\`response\`对象以后变成\`json\`字符串返回给客户端。\r
2. **反序列化**：把客户端发送过来的数据经过视图中的\`request\`对象以后变成字典，序列化器可以把字典转化成模型。\r
3. **完成数据校验**：反序列化之后自动做数据校验功能。\r
\r
\r
\r
### 定义序列化器\r
\r
\`DRF\`中使用类来定义序列化器，必须**直接或间接继承自\`DRF\`中的\`rest_framework.serializers.Serializer\`**\r
\r
\`\`\`python\r
from rest_framework import serializers\r
# 序列化器基类：serializers.Serializer\r
# 常用序列化器类：ModelSerializer\r
\r
class StudentExampleSerializer(serializers.Serializer):\r
    # 1. 声明要转换的字段\r
    id = serializers.IntegerField()\r
    name = serializers.CharField()\r
    sex = serializers.BooleanField()\r
    description = serializers.CharField() #注意没有TextField这个字段类型，所有的文本类型都用CharField来表示\r
\r
    # 2. 如果当前序列化器继承的是ModelSerializer类，则需要声明调用的模型信息\r
    class Meta:\r
        model = None\r
        fields = "__all__"\r
    # 3. 验证代码的对象方法，格式一定要对，否则会报错\r
    def validate(self, attrs): # 这是固定的验证多字段的写法, attrs是客户端传递过来的字典数据\r
        pass\r
    \r
    '''\r
    def vaildate_<字段名>(self, data): # 这是验证单个字段的写法, data是客户端传递过来的字段值\r
        pass\r
    '''\r
\r
    #4. 模型操作的代码,格式一定要对，否则会报错\r
    def create(self, validated_data): # 添加数据操作，添加数据以后，自动实现从字典转换为对象的操作\r
        pass\r
\r
    def update(self, instance, validated_data): # 更新数据操作，更新数据以后，自动实现从字典转换为对象的操作\r
        pass\r
\r
    # 删除操作和查询操作不需要实现，因为不需要转换为对象\r
\`\`\`\r
\r
**<font color=red>注意：Serializer不是只能为数据库模型类转换数据格式，也可以为非数据库模型类转换数据格式，Serializer是独立于数据库之外的存在</font>**\r
\r
\r
\r
### 常用字段类型\r
\r
*注：这些字段声明是提供给客户端显示的，所以序列化器有的一些数据库的字段并没有，同理数据库字段有的序列化器字段可能也没有*\r
\r
| 字段                      | 模型字段                                                     | 字段构造方式                                                 |\r
| ------------------------- | ------------------------------------------------------------ | :----------------------------------------------------------- |\r
| **\`BooleanField\`**        | \`models.BooleanField\`                                        | \`serializers.BooleanField()\`                                 |\r
| **\`CharField\`**           | \`models.CharField/TextField等\`                               | \`serializers.CharField(max_length=None, min_length=None, allow_blank=False, trim_whitespace=True)\` |\r
| **\`EmailField\`**          | \`models.EmailField\`                                          | \`serializers.EmailField(max_length=None, min_length=None, allow_blank=False\` |\r
| **\`RegexField\`**          | \`models.CharField\`                                           | \`serializers.RegexField(regex=, max_length=None, min_length=None, allow_blank=False)\` |\r
| **\`SlugField\`**           | \`models.SlugField\`                                           | \`serializers.SlugField(max_length=None, min_length=None, allow_blank=False)\`<br /><br />验证正则模式 [a-zA-Z0-9*-]+ |\r
| **\`URLField\`**            | \`models.URLField\`                                            | \`serializers.URLField(max_length=None, min_length=None, allow_blank=False)\` |\r
| **\`UUIDField\`**           | \`models.UUIDField\`                                           | \`serializers.UUIDField(format='hex_verbose')\`<br /><br />- \`hex_verbose\`：如“5ce0e9a5-5ffa-654b-cee0-1238041fb31a”， 是默认格式<br />- \`hex\`：如“5ce0e9a55ffa654bcee01238041fb31a”<br />- \`int\`：如”123456789012312313134124512351145145114“<br />- \`urn：如”urn:uuid:5ce0e9a5-5ffa-654b-cee0-1238041fb31a“ |\r
| **\`IPAddressField\`**      | \`models.IPAddressField\`                                      | \`serializers.IPAddressField(protocol='both', unpack_ipv4=False, **options)\` |\r
| **\`IntegerField\`**        | \`models.SmallIntegerField\`<br />\`models.IntegerField\`<br />\`models.BigIntegerField\` | \`serializers.IntegerressField(max_value=None, min_value=None)\` |\r
| **\`FloatField\`**          | \`models.FloatField\`                                          | \`serializers.FloatField(max_value=None, min_value=None)\`     |\r
| **\`DecimalField\`**        | \`models.DecimalField\`                                        | \`serializers.DecimalField(max_digits, decimal_places, coerce_to_string=None, max_value=None, min_value=None)\`<br /><br />- \`max_digits\`：数字长度<br />- \`decimal_places\`：小数点位置 |\r
| **\`DateTimeField\`**       | \`models.DateTimeField\`                                       | \`serializers.DateTimeField(format=api_settings.DATETIME_FORMAT, input_formats=None)\`<br /><br />api_settings.DATETIME_FORMAT（时间格式）：\`2025-04-06T22:05:33\` |\r
| **\`DateField\`**           | \`models.DateField\`                                           | \`serializers.DateField(format=api_settings.DATETIME_FORMAT, input_formats=None)\` |\r
| **\`TimeField\`**           | \`models.TimeField\`                                           | \`serializers.TimeField(format=api_settings.DATETIME_FORMAT, input_formats=None)\` |\r
| **\`DurationField\`**       | \`models.DurationField\`                                       | \`serializers.DurationField()\`                                |\r
| **\`ChoiceField\`**         | 无                                                           | \`serializers.ChoiceField(choices)\`<br /><br />- \`choices\`与\`Django\`用法相同 |\r
| **\`MultipleChoiceField\`** | 无                                                           | \`serializers.MultipleChoiceField(choices)\`<br /><br />- \`choices\`与\`Django\`用法相同 |\r
| **\`FileField\`**           | \`models.FileField\`                                           | \`serializers.FileField(max_length=None, allow_empty_file=False, use_url=UPLOADED_FILES_USE_URL)\` |\r
| **\`ImageField\`**          | \`models.ImageField\`                                          | \`serializers.ImageField(max_length=None, allow_empty_file=False, use_url=UPLOADED_FILES_USE_URL)\` |\r
| **\`ListField\`**           | 无。对应的是\`python\`里的\`list\`                               | \`serializers.ListField(child=, max_length=None, min_length=None)\`<br /><br />- \`child\`：模型列表 |\r
| **\`DictField\`**           | 无。对应的是\`python\`里的\`dict\`                               | \`serializers.ListField(child=)\`<br /><br />- \`child\`：模型对象 |\r
\r
\r
\r
#### 常用字段参数\r
\r
| 参数名          | 作用                   |\r
| --------------- | ---------------------- |\r
| max_length      | 最大长度               |\r
| min_length      | 最小长度               |\r
| allow_blank     | 是否允许为空           |\r
| trim_whitespace | 是否去除字符串前后空格 |\r
| max_value       | 最大数值               |\r
| min_value       | 最小数值               |\r
\r
\r
\r
#### 通用参数\r
\r
| 参数名         | 作用                                                         |\r
| -------------- | ------------------------------------------------------------ |\r
| read_only      | 该字段是否仅用于序列化，默认False，表示客户端传数据给服务端的时候会不会校验当前字段 |\r
| write_only     | 该字段是否仅用于反序列化参数，默认False，也就是客户端给服务端 |\r
| required       | 该字段在反序列化时必须输入，默认True                         |\r
| default        | 反序列化时使用的默认值，默认为None                           |\r
| allow_null     | 该字段反序列化时是否允许传入None，默认False                  |\r
| validators     | 该字段反序列化时使用的验证器，属性值是一个集合，集合里放置这个字段的验证函数，函数接收一个参数表示字段值 |\r
| error_messages | 反序列化时验证出错了返回的包含错误字段与错误信息的字典，可以不设置 |\r
| label          | 用于HTML展示API界面时显示字段名，不写则默认使用模型字段名，前提是当前序列化器已经继承了\`ModelSerializer\` |\r
| help_text      | 用于HTML展示API页面时，显示字段的辅助帮助信息，不写则默认使用模型字段名，前提是当前序列化器已经继承了\`ModelSerializer\` |\r
| invalid        | 用于反序列化时候数据格式校对                                 |\r
\r
\r
\r
## Serializer对象\r
\r
### 创建Serializer对象\r
\r
定义好\`Serializer\`类后，就可以创建\`Serializer\`对象了。这个对象帮我们进行序列化与反序列化的操作过程，减少我们的工作量。\r
\r
- **构造方法**：\r
\r
    \`\`\`python\r
    Serializer(instance=None, data=empty, many=False, context=**kwargs, partial=False)\r
    \r
    '''\r
    1. 用于序列化时，将模型类对象传入instance对象\r
    2. 用于反序列化时，将要被反序列的数据传入data参数，一般是request.body之类的\r
    3. 用于序列化时，当对多个模型对象进行序列化（也就是instance是一个QuerySet类型时），则需要声明many=True，如果是对单个模型对象序列化则不需要写。\r
    4. 除了instance和data参数之外，在构造Serializer对象时，还可通过context参数额外添加数据到序列化器中。\r
    5. partial参数表示对不存在的数据，不需要按照序列化器的字段列表进行验证，默认False\r
    '''\r
    \r
    # 常见写法\r
    Serializer = StudentSerializer(instance=student)\r
    Serializer = StudentSerializer(instance=student_list, many=True)\r
    Serializer = StudentSerializer(instance=student_list, context={"request": reuqest})\r
    \r
    \`\`\`\r
    \r
    - 序列化器声明以后**不会自动执行**，需要我们在视图中进行调用才可以。\r
    \r
    - 序列化器无法直接接收数据，需要在视图中实例化序列化器对象时把使用的数据通过instance传递过来\r
    \r
    - 序列化器的字段声明类似于我们前面使用过的模型\r
    \r
    - 开发\`restful API\`时，序列化器会帮我们把模型对象转换成字典\r
    \r
        \r
    \r
### 序列化\r
\r
#### 使用示例\r
\r
- \`model\`\r
\`\`\`python\r
from django.db import models\r
\r
# Create your models here.\r
class Student(models.Model):\r
    '''学生信息'''\r
    name = models.CharField(max_length=55, verbose_name='姓名')\r
    sex = models.BooleanField(default=True, verbose_name='性别')\r
    age = models.IntegerField(default=0, verbose_name='年龄')\r
    description = models.TextField(default='', verbose_name='描述')\r
    class_name = models.CharField(max_length=55, verbose_name='班级')\r
\r
    class Meta:\r
        db_table = 'tb_student'\r
        verbose_name = '学生'\r
        verbose_name_plural = '学生'\r
\`\`\`\r
- \`serializers.py\`\r
\r
\`\`\`python\r
class StudentSerializer(serializers.Serializer):\r
    # 1. 声明要转换的字段\r
\r
    # 学生信息序列化器，这里是要序列化的模型字段。\r
    id = serializers.IntegerField()\r
    name = serializers.CharField()\r
    sex = serializers.BooleanField()\r
    description = serializers.CharField() #注意没有TextField这个字段类型，所有的文本类型都用CharField来表示\r
\`\`\`\r
- \`views.py\`\r
\`\`\`python\r
from django.shortcuts import render\r
from .models import Student\r
from django.http import JsonResponse\r
from django.views import View\r
from .serializers import StudentSerializer\r
\r
# Create your views here.\r
\r
class Student1View(View):\r
    def get1(self, request):\r
        # 1. 获取一个学生对象，这里获取的是第一个学生对象\r
        student = Student.objects.first()\r
        print(student)\r
        # 1. 实例化序列化器对象，把模型对象传入序列化器中转换数据格式\r
        serializer = StudentSerializer(instance=student, many=False)\r
        print(serializer.data)\r
        return JsonResponse(serializer.data, safe=False) # safe=False表示可以返回非字典类型的数据\r
\r
    def get(self, request):\r
        # 1. 获取所有的学生对象\r
        students = Student.objects.all()\r
        # 2. 实例化序列化器对象，把模型对象传入序列化器中转换数据格式\r
        serializer = StudentSerializer(instance=students, many=True)\r
        print(serializer.data)\r
        return JsonResponse(serializer.data, safe=False)\r
\`\`\`\r
- 前端输出\r
\r
\`\`\`json\r
[\r
    {\r
        "id": 1,\r
        "name": "hsz",\r
        "sex": true,\r
        "description": "why7wdhgwu8 j dionmwd"\r
    },\r
    {\r
        "id": 2,\r
        "name": "rfwef",\r
        "sex": true,\r
        "description": "sdawdawd"\r
    }\r
]\r
\`\`\`\r
\r
 \r
\r
### 反序列化\r
\r
#### 数据验证\r
\r
使用序列化器进行反序列化时，需要对数据进行验证后，才能获得验证成功的数据保存成模型类对象。\r
\r
在获取反序列化的数据前，必须调用**\`is_valid()\`**方法进行验证，验证成功返回True否则返回False\r
\r
如果验证失败，可以通过序列化器对象的**\`errors\`**属性获取错误信息，返回字典。包含了字段和字段的错误。如果是非字段错误，可以通过修改\`REST framework\`配置中的\`NON_FIELD_ERRORS_KEY\` 来控制错误字典中的键名。\r
\r
 验证成功，可以通过序列化器对象的**\`validated_data\`**属性获取数据。\r
\r
在定义序列化器时，指明每个字段的序列化类型和选项参数，本身就是一种验证行为。\r
\r
**验证器类型：**\r
\r
- 内置验证器：\`error_messages\`、\`validators\`\r
- 外置验证器：\r
    - 多字段：\`validate\`\r
    - 单字段：\`validate_<字段名>\`\r
\r
#### 函数and属性\r
\r
- \`is_validI()\`：验证数据，不直接抛出异常，验证通过返回\`True\`\r
- \`is_valid(raise_exception=True)\`：验证数据，直接抛出异常，无返回值\r
- \`save()\`：自动调用序列化器中的\`create()\`函数或者\`update()\`函数\r
- \`errors\`：如果\`is_valid\`验证失败的话错误信息会传入这个属性\r
- \`error_messages\`：同上，但不能被\`validate\`函数自定义报错信息。\r
- \`validated_data\`：数据验证通过的话，验证通过的数据会传入这个属性\r
- \`data\`：获取序列化后的数据\r
\r
#### *示例*\r
\r
- 序列化器类\r
\r
\`\`\`python\r
from rest_framework import serializers\r
\r
def check(data): # 自定义验证函数，data是要验证的字段的值\r
    if data != "你好":\r
        raise serializers.ValidationError(detail="数据不允许为空", code="name")\r
    return data\r
\r
class StudentSerializer(serializers.Serializer):\r
    # 1. 声明要转换的字段\r
    id = serializers.IntegerField(read_only=True) # read_only=True表示只读字段，不能修改\r
    name = serializers.CharField(max_length=100, min_length=2, error_messages={\r
        "max_length": "姓名长度不能超过100个字符",\r
        "min_length": "姓名长度不能少于2个字符",\r
    })\r
    age = serializers.IntegerField(max_value=100, min_value=1, error_messages={\r
        "max_value": "年龄不能超过100岁",\r
        "min_value": "年龄不能小于0岁",\r
        "required": "年龄不能为空",\r
        "invalid": "年龄格式不正确",\r
    })\r
    sex = serializers.BooleanField(default=True, error_messages = {\r
        "required": "性别不能为空",\r
        "invalid": "性别格式不正确",\r
    }) # 默认值为True\r
    description = serializers.CharField(validators=[check]) #注意没有TextField这个字段类型，所有的文本类型都用CharField来表示\r
    \r
    # 也可以自己再定义错误信息\r
    def validate(self, attrs): # 这是固定的验证多字段的写法, attrs是客户端传递过来的字典数据\r
        # 1. 验证多个字段的值\r
        if len(attrs["password"]) < 20:\r
            raise serializers.ValidationError(detail="密码不能小于20", code="name_age")\r
        # 2. 验证单个字段的值\r
        if attrs["name"] == "root":\r
            raise serializers.ValidationError(detail="姓名不能为root", code="name")\r
        # attrs["name"] = "hello" #这样会覆盖客户端传递过来的数据\r
        return attrs # 返回验证通过的字典数据，这一步不可以少\r
\r
    def validate_name(self, data): # 这是验证单个字段的写法, data是客户端传递过来的字段值\r
        print(data)\r
        if data == "张三":\r
            raise serializers.ValidationError(detail=f"姓名不能为{data}", code="name")\r
        return data #这一步不可以少\r
\`\`\`\r
\r
- 视图\r
\r
\`\`\`python\r
from django.shortcuts import render\r
from .models import Student\r
from django.http import JsonResponse\r
from django.views import View\r
from .serializers import StudentSerializer\r
\r
# Create your views here.\r
\r
class Student1View(View):\r
    def get(self, request):\r
        # 序列化器基本使用，反序列化器的使用\r
\r
        # 1. 实例化序列化器对象，把字典数据传入序列化器中转换数据格式\r
        data = {\r
            "name": "李四",\r
            "age": 18,\r
            "sex": True,\r
            "class_name": "三年级一班",\r
            "description": "这是一个学生",\r
            "password": "123456",\r
        }\r
\r
        # 实例化序列化器类用于反序列化\r
        serializer = StudentSerializer(data=data)\r
\r
        # 2. 校验数据是否合法\r
        res = serializer.is_valid() #验证失败不会抛出异常\r
        \r
        # raise_exception=True表示校验不合法时，抛出异常，是常用方法，且此时异常会直接抛入终端和前端因此不需要再使用res接收验证结果\r
        # 如果验证失败则不会再执行后面的代码\r
        # serializer.is_valid(raise_exception=True)\r
        \r
        if res: \r
            print("验证通过")\r
            print(serializer.validated_data) # 打印转换后的数据\r
        else: \r
            print(serializer.errors) # 打印错误信息\r
\r
        return JsonResponse("ok", safe=False)\r
\`\`\`\r
\r
\r
\r
#### 异常类\r
\r
| 类名                                        | 作用                                   |\r
| ------------------------------------------- | -------------------------------------- |\r
| \`serializers.ValidationError(detail, code)\` | 用于\`validate\`函数抛出异常使得验证失败 |\r
\r
\r
\r
#### 保存数据\r
\r
前面的数据验证成功后，我们可以使用序列化器来完成数据的反序列化的过程，这个过程可以把数据转成模型类对象。可以通过实现\`create()\`和\`update()\`两个方法来实现。\r
\r
*示例*：\r
\r
- \`serializers.py\`\r
\r
    \`\`\`python\r
    def create(self, validated_data): \r
            '''添加数据操作，添加数据以后，自动实现从字典转换为对象的操作'''\r
            student = Student.objects.create(**{\r
                "name": validated_data["name"],\r
                "age": validated_data["age"],\r
                "sex": validated_data["sex"],\r
                "description": validated_data["description"],\r
                "class_name": validated_data["class_name"],\r
            })\r
            # 注意是可以把新增的模型对象作为返回值返回给serializer类的save方法中\r
            return student\r
    \`\`\`\r
\r
- \`views.py\`\r
\r
    \`\`\`python\r
    def get(self, request):\r
            '''保存数据'''\r
            data = {\r
                "name": "小明",\r
                "age": 18,\r
                "sex": True,\r
                "class_name": "三年级一班",\r
                "description": "dwdwd",\r
                "password": "12345611111111111111111111111111",\r
            }\r
            serialiazer = StudentSerializer(data=data)\r
            serialiazer.is_valid(raise_exception=True)\r
            '''\r
            save()源码中，根据实例化序列化器时候传入的参数有没有instance来判断使用create还是update方法\r
            如果传入了instance参数，则调用update方法，否则调用create方法\r
            如果调用create，则validated_data会被传入create方法中\r
            如果调用update，则会把instance对象和validated_data都传入到update方法中\r
            '''\r
            res = serialiazer.save()\r
            print(res)\r
            # 3. 返回数据，还可以使用serialiazer.data来获取序列化后的数据\r
            return JsonResponse(serialiazer.data, safe=False)\r
    \`\`\`\r
\r
    \r
\r
#### 修改数据\r
\r
前面的数据验证成功后，我们可以使用序列化器来完成数据的反序列化的过程，这个过程可以把数据转成模型类对象。可以通过实现\`create()\`和\`update()\`两个方法来实现。\r
\r
*示例*：\r
\r
- \`serializations.py\`\r
\r
    \`\`\`python\r
    def update(self, instance, validated_data): # 更新数据操作，更新数据以后，自动实现从字典转换为对象的操作\r
            '''更新数据操作，更新数据以后，自动实现从字典转换为对象的操作'''\r
            instance.name = validated_data.get("name", instance.name) # get方法可以设置默认值\r
            instance.age = validated_data.get("age", instance.age)\r
            instance.sex = validated_data.get("sex", instance.sex)\r
            instance.description = validated_data.get("description", instance.description)\r
            instance.class_name = validated_data.get("class_name", instance.class_name)\r
            instance.save() #这是模型对象的保存方法\r
            return instance\r
    \`\`\`\r
\r
- \`views.py\`\r
\r
    \`\`\`python\r
    def get(self, request):\r
            '''修改数据'''\r
            data = {\r
                "name": "小明",\r
                "age": 100,\r
                "sex": True,\r
                "class_name": "三年级一班",\r
                "description": "dwdwd",\r
                "password": "12345611111111111111111111111111",\r
            }\r
            student = Student.objects.filter(name=data["name"]).first()\r
            serialiazer = StudentSerializer(instance=student, data=data)\r
            serialiazer.is_valid(raise_exception=True)\r
            '''\r
            save()源码中，根据实例化序列化器时候传入的参数有没有instance来判断使用create还是update方法\r
            如果传入了instance参数，则调用update方法，否则调用create方法\r
            如果调用create，则validated_data会被传入create方法中\r
            如果调用update，则会把instance对象和validated_data都传入到update方法中\r
            '''\r
            res = serialiazer.save() # save也是有返回值的，这个返回值是create或者update方法赋予的\r
            print(res)\r
            # 3. 返回数据，还可以使用serialiazer.data来获取序列化后的数据\r
            return JsonResponse(serialiazer.data, safe=False)\r
    \`\`\`\r
\r
#### 附加说明\r
\r
1. 在使用序列器的\`save()\`函数进行保存数据时候，可以提供额外的数据，这些数据可以被\`create()\`和\`update()\`函数中的\`validated_data\`参数获取到。但是注意，**此时的\`validated_data\`参数和序列化器内的\`validated_data\`是不同的。\r
\r
#### save函数的源码\r
\r
\`\`\`python\r
# 出现**kwargs，说明可以由开发者自己再提供一些数据进去，这与对象中的context是相同的\r
def save(self, **kwargs):\r
    validated_data = {**self.validated_data, **kwargs}\r
\r
    if self.instance is not None:\r
        self.instance = self.update(self.instance, validated_data)\r
        assert self.instance is not None, (\r
            '\`update()\` did not return an object instance.'\r
        )\r
    else:\r
        self.instance = self.create(validated_data)\r
        assert self.instance is not None, (\r
            '\`create()\` did not return an object instance.'\r
        )\r
\r
    return self.instance\r
\`\`\`\r
\r
\r
\r
### 一份完整的Serializer类\r
\r
- \`serializers.py\`\r
\r
    \`\`\`python\r
    #注意某些数据与上文有出入\r
    from rest_framework import serializers\r
    from .models import Student # 导入模型类\r
    # 序列化器基类：serializers.Serializer\r
    # 常用序列化器delSerializer类：Mo\r
\r
    def check(data): # 自定义验证函数，data是客户端传递过来的字段值\r
        if not data:\r
            raise serializers.ValidationError(detail="数据不允许为空", code="name")\r
        return data\r
\r
    class StudentSerializer(serializers.Serializer):\r
        # 1. 声明要转换的字段\r
        id = serializers.IntegerField(read_only=True) # read_only=True表示只在序列化时使用，反序列化时不使用\r
        name = serializers.CharField(max_length=100, min_length=2, error_messages={\r
            "max_length": "姓名长度不能超过100个字符",\r
            "min_length": "姓名长度不能少于2个字符",\r
        })\r
        age = serializers.IntegerField(max_value=100, min_value=1, error_messages={\r
            "max_value": "年龄不能超过100岁",\r
            "min_value": "年龄不能小于0岁",\r
            "required": "年龄不能为空",\r
            "invalid": "年龄格式不正确",\r
        })\r
        sex = serializers.BooleanField(default=True, error_messages = {\r
            "required": "性别不能为空",\r
            "invalid": "性别格式不正确",\r
        }) # 默认值为True\r
        description = serializers.CharField(validators=[check]) #注意没有TextField这个字段类型，所有的文本类型都用CharField来表示\r
        password = serializers.CharField(write_only=True, allow_null=True, error_messages={\r
            "required": "密码不能为空",\r
            "invalid": "密码格式不正确",\r
        }) # write_only表示只在反序列化时使用，序列化时不使用\r
        class_name = serializers.CharField(max_length=100, min_length=2, error_messages={\r
            "max_length": "班级长度不能超过100个字符",\r
            "min_length": "班级长度不能少于2个字符",\r
        })\r
\r
        '''\r
        # 2. 如果当前序列化器继承的是ModelSerializer类，则需要声明调用的模型信息\r
        class Meta:\r
            model = None\r
            fields = "__all__"\r
        '''\r
\r
        # 3. 验证代码的对象方法，格式一定要对，否则会报错\r
        def validate(self, attrs): # 这是固定的验证多字段的写法, attrs是客户端传递过来的字典数据\r
            # 1. 验证多个字段的值\r
            if len(attrs["password"]) < 20:\r
                raise serializers.ValidationError(detail="密码不能小于20", code="name_age")\r
            # 2. 验证单个字段的值\r
            if attrs["name"] == "root":\r
                raise serializers.ValidationError(detail="姓名不能为root", code="name")\r
            return attrs # 返回验证通过的字典数据\r
\r
        def validate_name(self, data): # 这是验证单个字段的写法, data是客户端传递过来的字段值\r
            if data == "张三":\r
                raise serializers.ValidationError(detail=f"姓名不能为{data}", code="name")\r
            return data\r
\r
        # #4. 模型操作的代码,格式一定要对，否则会报错\r
        # 添加数据操作，添加数据以后，自动实现从字典转换为对象的操作，需要视图调用save方法保存数据\r
        def create(self, validated_data): \r
            '''添加数据操作，添加数据以后，自动实现从字典转换为对象的操作'''\r
            student = Student.objects.create(**{\r
                "name": validated_data["name"],\r
                "age": validated_data["age"],\r
                "sex": validated_data["sex"],\r
                "description": validated_data["description"],\r
                "class_name": validated_data["class_name"],\r
            })\r
            # 注意是可以把新增的模型对象作为返回值返回给serializer类的save方法中\r
            return student\r
\r
        def update(self, instance, validated_data): # 更新数据操作，更新数据以后，自动实现从字典转换为对象的操作\r
            '''更新数据操作，更新数据以后，自动实现从字典转换为对象的操作'''\r
            instance.name = validated_data.get("name", instance.name) # get方法可以设置默认值\r
            instance.age = validated_data.get("age", instance.age)\r
            instance.sex = validated_data.get("sex", instance.sex)\r
            instance.description = validated_data.get("description", instance.description)\r
            instance.class_name = validated_data.get("class_name", instance.class_name)\r
            instance.save() #这是模型对象的保存方法\r
            return instance\r
\r
    \`\`\`\r
\r
- \`views.py\`\r
\r
    \`\`\`python\r
    from django.shortcuts import render\r
    from .models import Student\r
    from django.http import JsonResponse\r
    from django.views import View\r
    from .serializers import StudentSerializer\r
    \r
    # Create your views here.\r
    \r
    class Student1View(View):\r
        def get1(self, request):\r
            # 1. 获取一个学生对象，这里获取的是第一个学生对象\r
            student = Student.objects.first()\r
            print(student)\r
            # 1. 实例化序列化器对象，把模型对象传入序列化器中转换数据格式\r
            serializer = StudentSerializer(instance=student, many=False)\r
            print(serializer.data)\r
            return JsonResponse(serializer.data, safe=False) # safe=False表示可以返回非字典类型的数据\r
        \r
        def get2(self, request):\r
            # 1. 获取所有的学生对象\r
            students = Student.objects.all()\r
            # 2. 实例化序列化器对象，把模型对象传入序列化器中转换数据格式\r
            serializer = StudentSerializer(instance=students, many=True)\r
            print(serializer.data)\r
            return JsonResponse(serializer.data, safe=False)\r
        \r
        def get3(self, request):\r
            # 序列化器基本使用，反序列化器的使用\r
    \r
            # 1. 实例化序列化器对象，把字典数据传入序列化器中转换数据格式\r
            data = {\r
                "name": "李四",\r
                "age": 18,\r
                "sex": True,\r
                "class_name": "三年级一班",\r
                "description": "dwdwd",\r
                "password": "12345611111111111111111111111111",\r
            }\r
    \r
            # 实例化序列化器类用于反序列化\r
            serializer = StudentSerializer(data=data)\r
    \r
            # 2. 校验数据是否合法\r
            res = serializer.is_valid() #验证失败不会抛出异常\r
            # res = serializer.is_valid(raise_exception=True) # raise_exception=True表示校验不合法时，抛出异常，是常用方法\r
            if res: \r
                print("验证通过")\r
                print(serializer.validated_data) # 打印转换后的数据\r
                serializer.save() # 调用序列化器的create或update方法\r
            else: \r
                print(serializer.errors) # 打印错误信息\r
    \r
            return JsonResponse("ok", safe=False)\r
        \r
        def get4(self, request):\r
            '''保存数据'''\r
            data = {\r
                "name": "小明",\r
                "age": 18,\r
                "sex": True,\r
                "class_name": "三年级一班",\r
                "description": "dwdwd",\r
                "password": "12345611111111111111111111111111",\r
            }\r
            serialiazer = StudentSerializer(data=data)\r
            serialiazer.is_valid(raise_exception=True)\r
            '''\r
            save()源码中，根据实例化序列化器时候传入的参数有没有instance来判断使用create还是update方法\r
            如果传入了instance参数，则调用update方法，否则调用create方法\r
            如果调用create，则validated_data会被传入create方法中\r
            如果调用update，则会把instance对象和validated_data都传入到update方法中\r
            '''\r
            res = serialiazer.save()\r
            print(res)\r
            # 3. 返回数据，还可以使用serialiazer.data来获取序列化后的数据\r
            return JsonResponse(serialiazer.data, safe=False)\r
        \r
        def get(self, request):\r
            '''修改数据'''\r
            data = {\r
                "name": "小明",\r
                "age": 99,\r
                "sex": True,\r
                "class_name": "三年级一班",\r
                #"description": "dwdwd",\r
                "password": "12345611111111111111111111111111",\r
            }\r
            student = Student.objects.filter(name=data["name"]).first()\r
            serialiazer = StudentSerializer(instance=student, data=data, partial=True)\r
            serialiazer.is_valid(raise_exception=True)\r
            '''\r
            save()源码中，根据实例化序列化器时候传入的参数有没有instance来判断使用create还是update方法\r
            如果传入了instance参数，则调用update方法，否则调用create方法\r
            如果调用create，则validated_data会被传入create方法中\r
            如果调用update，则会把instance对象和validated_data都传入到update方法中\r
            '''\r
            res = serialiazer.save() # save也是有返回值的，这个返回值是create或者update方法赋予的\r
            print(res)\r
            # 3. 返回数据，还可以使用serialiazer.data来获取序列化后的数据\r
            return JsonResponse(serialiazer.data, safe=False)\r
    \`\`\`\r
\r
\r
\r
## 模型序列化器ModelSerializer\r
\r
### 概述\r
\r
如果想要序列化器对应的是\`Django\`的模型类，DRF提供了\`ModelSerializer\`模型类序列化器。使得我们可以快速构建一个\`Serializer\`类。\r
\r
\`ModelSerializer\`与常规的\`Serializer\`用法基本相同，但是额外提供了\r
\r
- 基于模型类自动生成的一系列序列化字段\r
- 基于模型类自动为\`Serializer\`生成\`validators\`，比如\`unique_together\`\r
- 包含默认的\`create()\`和\`update()\`的实现\r
\r
\r
\r
### \`Meta\`类里的属性\r
\r
| 属性                | 必填 | 含义                                                         | 可填值                                                       |\r
| ------------------- | ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |\r
| \`model\`             | 是   | 序列化器的指定模型类                                         | 模型类名                                                     |\r
| \`fields\`            | 是   | 哪些字段需要被序列化器使用，包括模型类字段以及模型外字段     | 模型内字段名以及模型外字段名<br />\`__all__\`表示模型内所有字段 |\r
| \`read_only_fields\`  | 否   | \`fields\`属性里，定义只用于序列化阶段使用的字段               | 字段名，默认值为\`[]\`                                         |\r
| \`write_only_fields\` | 否   | \`fields\`属性里，定义只用于反序列化阶段使用的字段             | 字段名，默认值为\`[]\`                                         |\r
| \`exclude\`           | 否   | 排除模型里某个既不序列化也不反序列的字段，是\`fields\`的互斥属性，一般不用 | 字段名，默认值为\`[]\`                                         |\r
| \`extra_kwargs\`      | 否   | 对\`fields\`属性里某个字段进行额外的说明，使用字典来实现       | 字段名与说明内容组成的字典                                   |\r
\r
\r
\r
### 定义ModelSerializer\r
\r
### 示例\r
\r
- \`models.py\`\r
\r
    \`\`\`python\r
    from django.db import models\r
    \r
    # Create your models here.\r
    class Student(models.Model):\r
        '''学生信息'''\r
        name = models.CharField(max_length=55, verbose_name='姓名')\r
        sex = models.BooleanField(default=True, verbose_name='性别')\r
        age = models.IntegerField(default=0, verbose_name='年龄')\r
        description = models.TextField(default='', verbose_name='描述')\r
        class_name = models.CharField(max_length=55, verbose_name='班级')\r
    \r
        class Meta:\r
            db_table = 'tb_student'\r
            verbose_name = '学生'\r
            verbose_name_plural = '学生'\r
    \`\`\`\r
\r
- \`serializers.py\`\r
\r
    \`\`\`python\r
    class StudentModelSerializer(serializers.ModelSerializer):\r
        age = serializers.IntegerField(max_value=100, min_value=1, error_messages={\r
            "max_value": "年龄不能超过100岁",\r
            "min_value": "年龄不能小于0岁",\r
            "required": "年龄不能为空",\r
            "invalid": "年龄格式不正确",\r
        })\r
        password = serializers.CharField(min_length=8, write_only=True, allow_null=True, error_messages={\r
            "required": "密码不能为空",\r
            "invalid": "密码格式不正确",\r
            "min_length": "密码长度不能小于8个字符",\r
        }) # write_only表示只在反序列化时使用，序列化时不使用\r
    \r
        re_password = serializers.CharField(min_length=8, write_only=True, allow_null=True, error_messages={\r
            "required": "确认密码不能为空",\r
            "invalid": "确认密码格式不正确",\r
            "min_length": "确认密码长度不能小于8个字符",\r
        }) # write_only表示只在反序列化时使用，序列化时不使用\r
    \r
        def validate(self, attrs): # 这是固定的验证多字段的写法, attrs是客户端传递过来的字典数据\r
            if attrs["password"] != attrs["re_password"]:\r
                raise serializers.ValidationError(detail="两次密码不一致", code="name_age")\r
            # 由于确认密码字段是一个临时字段，所以在验证完成后需要删除,，所以可以在validate方法中删除\r
            # 避免在保存数据的时候出错（因为数据库中并没有这两个字段）\r
            # 这里的attrs是一个字典对象，pop方法可以删除字典中的指定键值对\r
            attrs.pop("re_password") # 删除确认密码字段\r
            attrs.pop("password") # 删除密码字段\r
            return attrs\r
    \r
        class Meta:\r
            model = Student # 指定模型类，必填\r
    \r
            # 指定要序列化的字段，fields表示指定字段，必填\r
            fields = ["name", "age", "sex", "description", "class_name", "password", "re_password"]\r
    \r
            #fields = "__all__"   # 指定要序列化的字段，__all__表示所有字段\r
    \r
            read_only_fields = ["id", "sex"] # 指定只读字段，read_only_fields表示只序列化字段，默认值为[]\r
            write_only_fields = ["password", "re_password"] # 指定只写字段，write_only_fields表示只反序列化字段，默认值为[]\r
    \r
            '''fields里的参数的额外说明可以放到这里\r
            extra_kwargs = {\r
                "age": {\r
                    "min_value": 1, # age字段的最小值\r
                    "max_value": 100, # age字段的最大值\r
                    "required": True, # age字段是必填字段\r
                    "error_messages": {\r
                        "required": "年龄不能为空",\r
                        "invalid": "年龄格式不正确",\r
                    },\r
                },\r
            }\r
            '''\r
    \`\`\`\r
\r
- \`views.py\`\r
\r
    \`\`\`python\r
    def get6(self, request):\r
            student = Student.objects.all()\r
            serializer = StudentModelSerializer(instance=student, many=True)\r
            return JsonResponse(serializer.data, safe=False)\r
        \r
        def get(self, request):\r
            '''ModelSerializer的反序列化阶段'''\r
            data = {\r
                "name": "小明",\r
                "age": 100,\r
                "class_name": "三年级一班",\r
                "description": "dwdwd",\r
                "Sex": True,\r
                "password": "12345611111111111111111111111111",\r
                "re_password": "12345611111111111111111111111111",\r
            }\r
            serializer = StudentModelSerializer(data=data)\r
            serializer.is_valid(raise_exception=True)\r
            serializer.save()\r
            return JsonResponse(serializer.data, safe=False)\r
    \`\`\`\r
\r
    \r
\r
### 附加说明\r
\r
对于一些复杂的数据库，如果多对多模型，\`ModelSerializer\`仍然会有效果。只不过处理过程会相对麻烦。例如在有外键的时候，\`ModelSerializer\`会自动把主键\`id\`设置为另一个表字段的显示内容。\r
\r
例如有如下模型：\r
\r
\`\`\`python\r
class Tag(models.Model):\r
    name = models.CharField(max_length=50)\r
\r
class Article(models.Model):\r
    title = models.CharField(max_length=100)\r
    tags = models.ManyToManyField(Tag)\r
\`\`\`\r
\r
可以直接使用\`ModelSerializer\`这样序列化\`Article\`：\r
\r
\`\`\`python\r
class ArticleSerializer(serializers.ModelSerializer):\r
    class Meta:\r
        model = Article\r
        fields = '__all__'\r
\`\`\`\r
\r
DRF 会默认把 \`tags\` 显示为主键 ID 列表：\r
\r
\`\`\`python\r
{\r
  "title": "Test Article",\r
  "tags": [1, 2, 3] # Tag模型对应的主键id\r
}\r
\`\`\`\r
\r
而如果想要在序列化\`Article\`时让\`Tag\`字段显示\`name\`属性，只需要使用==**嵌套序列化器**==。例如：\r
\r
\`\`\`python\r
class TagSerializer(serializers.ModelSerializer):\r
    class Meta:\r
        model = Tag\r
        fields = ['id', 'name']\r
\r
class ArticleSerializer(serializers.ModelSerializer):\r
    tags = TagSerializer(many=True)\r
\r
    class Meta:\r
        model = Article\r
        fields = ['id', 'title', 'tags']\r
\`\`\`\r
\r
此时返回内容会变成：\r
\r
\`\`\`python\r
{\r
  "id": 1,\r
  "title": "Test Article",\r
  "tags": [\r
    {"id": 1, "name": "Python"},\r
    {"id": 2, "name": "Django"}\r
  ]\r
}\r
\`\`\`\r
\r
而在使用\`create()\`和\`update()\`函数的时候需要注意：\r
\r
<p style="color: red; font-size: 1.4em;"><strong>嵌套序列化器是不能自动处理多表关联写入的，因此需要重写create()和update()函数</strong></p>\r
\r
\r
\r
\r
\r
## Serializer和ModelSerializer对比\r
\r
- \`Serializer\`\r
    - 字段声明（必选）\r
    - 字段验证（可选）\r
    - 添加/保存数据功能（可选）\r
- \`ModelSerializer\`\r
    - 字段声明（可选）\r
    - 验证（可选）\r
    - 添加/保存数据功能（已经自动实现基础的添加和保存功能）\r
    - \`Meta\`类声明（必选）\r
\r
**如果数据需要从数据库中获取，则使用\`ModelSerializer\`，否则一般用\`Serializer\`**\r
\r
\r
\r
\r
\r
## \`Http\`请求与响应\r
\r
DRF除了在数据序列化部分简写代码外，还在视图中提供了简写操作。在\`django.views.View\`类的基础上，DRF封装了多个视图子类。其主要作用有：\r
\r
- **控制序列化器的执行、检验、保存、转换数据**\r
- **控制数据库查询的执行**\r
- **调用请求类和响应类（这两个类是由DRF扩展的功能类）**\r
\r
**类视图**\r
\r
\`\`\`python\r
from rest_framework.views import APIView\r
\`\`\`\r
\r
\r
\r
### 内容协商\r
\r
在客户端和服务器之间的数据通信过程中，给予协议增加数据格式的声明，方便对端理解本端发送的数据格式和期望返回的数据格式。DRF实现的\`Request\`和\`Response\`子类都是基于内容协商来完成数据的转换的。\r
\r
- **$request \\rightarrow parser(http请求解析类) \\rightarrow 识别客户端请求头中的Content-Type来完成数据转换 \\rightarrow 类字典(QueryDict，字典的子类)$**\r
- **$response \\rightarrow render(http响应渲染类) \\rightarrow 识别客户端中的Accept来提取客户端期望的返回数据格式 \\rightarrow 转成客户端期望的数据格式$**\r
\r
\`\`\`http\r
Content-Type: application/json;\r
Accept: application/json, text/html;\r
\`\`\`\r
\r
*如果请求头中并没有\`Accept\`，那么默认按照\`Content_Type\`格式来返回*\r
\r
<p style="opacity: 0.8;">浏览器一般会带一个\`Accept\`请求头表示期望返回一个\`text/html\`格式的数据，而Django默认是没有内容协商的</p>\r
\r
\r
\r
### \`Request\`\r
\r
DRF传入视图的\`request\`对象不再是\`Django\`默认的\`HttpRequest\`对象，而是DRF提供的扩展类\`Request\`类的对象。DRF提供了\`Parser\`解析器，在接收到请求后会自动根据\`Content-Type\`指明的请求数据类型将请求数据进行解析，解析为类字典\`QueryDict\`对象保存到\`Request\`对象中。\r
\r
**\`Request\`对象的数据是自动根据前端发送数据的格式进行解析之后的结果。无论前端发送的哪种格式的数据，都可以以统一的方式(\`request.data\`)读取客户端提交的数据。**\r
\r
- 如果客户端提交的是\`json\`数据，则\`request.data\`得到的是一个\`dict\`字典\r
- 如果客户端提交的是表单数据，则\`request.data\`得到的是一个\`QueryDict\`类字典\r
\r
\r
\r
#### 常用属性\r
\r
| 属性名         | 含义                                                         |\r
| -------------- | ------------------------------------------------------------ |\r
| \`data\`         | 返回解析之后<font color=red>**请求体**</font>的数据，包含了对\`POST\`、\`PUT\`和\`PATCH\`的支持 |\r
| \`query_params\` | 查询参数，也叫查询字符串(query string)，**与\`Django\`标准的\`request.GET\`相同**，只是更换了名称 |\r
| \`_request\`     | 获取\`Django\`封装的\`HttpRequest\`对象                          |\r
\r
\r
\r
#### 使用示例\r
\r
- \`views.py\`\r
\r
\`\`\`python\r
from rest_framework.views import APIView\r
from rest_framework.response import Response\r
\r
class StudentAPIView(APIView):\r
    def get(self, request):\r
        return Response({"code": 200, "msg": "ok"})\r
\`\`\`\r
\r
\r
\r
### \`Response\`\r
\r
DRF提供了响应类\`Response\`，使用该类实例化响应对象时，响应的具体数据内容会被转换(renderer渲染器)成符合前端需求的数据。\r
\r
DRF提供了\`render\`渲染器，用来根据请求头中的\`Accept\`参数来自动转换响应数据到对应格式。如前端并未声明\`Accept\`，则会采用\`Content_Type\`方式处理响应数据。可以通过配置来修改默认响应格式。\r
\r
可以在\`rest_framework/settings.py\`查找所有的DRF默认配置选项。\r
\r
\`\`\`python\r
REST_FRAMEWORK = {\r
    'DEFAULT_RENDERER_CLASSES': {\r
        'rest_framework.renderers.JSONRenderer', #json渲染器，返回json数据\r
        'rest_framework.renderers.BrowsableAPIRenderer', #浏览器API渲染器，返回测试界面\r
    }\r
}\r
\`\`\`\r
\r
**import**\r
\r
\`\`\`python\r
from rest_framework.response import Response\r
\`\`\`\r
\r
\r
\r
#### 构造方式\r
\r
\`\`\`pythonm\r
Response(data, status=None, template_name=None, headers=None, content-type=None)\r
\`\`\`\r
\r
- \`data\`：要传给前端的数据，DRF会自动使用\`renderer\`渲染器处理，只能是基础数据类型\r
- \`status\`：后端返回给前端的状态码，默认200，DRF中提供了一个HTTP响应状态码的文件\r
- \`template_name\`：模板名称，如果使用\`HTMLRenderer\`时需指明\r
- \`headers\`：用于存放响应头信息的字典\r
- \`content_type\`：**响应数据的**\`Content_Type\`，通常此参数无需传递，但如果偶尔需要后端强制性指定返回参数类型时需要指定\r
\r
\r
\r
#### 常用属性\r
\r
| 属性名        | 含义                                                       |\r
| ------------- | ---------------------------------------------------------- |\r
| \`data\`        | 传给\`Response\`对象的数据序列化后但尚未被\`render\`处理的数据 |\r
| \`status_code\` | 状态码的数字                                               |\r
| \`status_text\` | 状态码的信息                                               |\r
| \`content\`     | 经过\`render\`处理之后的响应数据，几乎不用                   |\r
\r
\r
\r
#### 状态码\r
\r
DRF的状态码也支持像\`Django\`那样直接写入数字，如\`status=200\`，但DRF提供了一个一目了然的状态码类。\r
\r
**import **\r
\r
\`\`\`python\r
from rest_framework import status\r
\`\`\`\r
\r
- 消息告知\r
\r
    - \`HTTP_100_CONTINUE\`\r
    - \`HTTP_101_SWITCHING_PROTOCOLS\`\r
- 成功\r
\r
    - \`HTTP_200_OK\`\r
    - \`HTTP_201_CREATED\`\r
    - \`HTTP_202_ACCEPTED\`\r
    - \`HTTP_203_NON_AUTHORITATIVE_INFORMATION\`\r
    - \`HTTP_204_NO_CONTENT\`\r
- 重定向\r
\r
    - \`HTTP_300_MULTIPLE_CHOICES\`\r
    - \`HTTP_301_MOVED_PERMANENTLY\`\r
    - \`HTTP_302_FOUND\`\r
    - \`HTTP_303_SEE_OTHER\`\r
    - \`HTTP_304_NOT_MODIFIED\`\r
    - \`HTTP_306_RESERVED\`\r
    - \`HTTP_307_TEMPORARY_REDIRECT\`\r
- 客户端错误\r
\r
    - \`HTTP_400_BAD_REQUEST\`\r
    - \`HTTP_401_UNAUTHORIZED\`\r
    - \`HTTP_402_PAYMENT_REQUIRED\`\r
    - \`HTTP_403_FORBIDDEN\`\r
    - \`HTTP_404_NOT_FOUND\`\r
    - \`HTTP_405_METHOD_NOT_ALLOWED\`\r
    - \`HTTP_406_NOT_ACCEPTABLE\`\r
    - \`HTTP_407_PROXY_AUTHENTICATION_REQUIRED\`\r
    - \`HTTP_408_REQUEST_TIMEOUT\`\r
    - \`HTTP_413_REQUEST_ENTITY_TOO_LARGE\`\r
    - \`HTTP_414_REQUEST_URI_TOO_LONG\`\r
    - \`HTTP_429_TOO_MANY_REQUESTS\`\r
    - \`HTTP_415_UNSUPPORTED_MEDIA_TYPE\`\r
    - \`HTTP_431_REQUEST_HEADER_FIELDS_TOO_LARGE\`\r
- 服务器错误\r
    - \`HTTP_500_INTERNAL_SERVER_ERROR\`\r
    - \`HTTP_501_NOT_IMPLEMENTED\`\r
    - \`HTTP_502_BAD_GATEWAY\`\r
    - \`HTTP_503_SERVICE_UNAVAILABLE\`\r
    - \`HTTP_504_GATEWAY_TIMEOUT\`\r
    - \`HTTP_505_HTTP_VERSION_NOT_SUPPORTED\`\r
    - \`HTTP_507_INSUFFICIENT_STORAGE\`\r
    - \`HTTP_511_NETWORK_AUTHENTICATION_REQUIRED\`\r
\r
\r
\r
\r
\r
## 视图\r
\r
DRF视图的四大核心：**\`APIView\`、\`GenericAPIView\`、视图扩展类(Mixins)、视图集(ViewSet)**。\r
\r
DRF提供视图的主要作用有：\r
\r
- 控制序列化器的执行\r
- 控制数据库模型的操作\r
\r
\r
\r
### 普通视图\r
\r
#### \`APIView\`\r
\r
##### import\r
\r
\`\`\`python\r
from rest_framework.views import APIView\r
\`\`\`\r
\r
##### 详细说明\r
\r
\`APIView\`是DRF提供的所有视图类的基类，继承自\`Django\`的\`View\`类。其不同之处为：\r
\r
- 传入到视图方法的是DRF中的\`Request\`对象而不是\`Django\`的\`HttpRequest\`对象\r
- 视图方法可以返回\`DRF\`的\`Response\`对象，视图会为响应数据设置\`renderer\`转换数据格式\r
- 任何\`APIException\`异常都会被捕捉到，并且处理成合适格式的响应信息返回给客户端\r
- 重新声明了一个\`as_view()\`方法并在\`dispatch()\`进行路由分发前会对客户端进行身份认证，权限检查，流量控制等\r
\r
同时，\`APIView\`除了继承\`View\`原有的属性方法外，还新增了类属性：\r
\r
- **\`Authenticated_classes\`：列表或元组，身份认证**\r
- **\`permission_classes\`：列表或元组，权限检查**\r
- **\`throttle_classes\`：列表或元组，流量控制**\r
\r
在\`APIView\`中仍然以常规的类视图定义方法来实现\`GET\`，\`POST\`等请求方法\r
\r
##### 示例\r
\r
- \`serializers.py\`\r
\r
    \`\`\`python\r
    from rest_framework import serializers\r
    from sers.models import Student\r
    \r
    class StudentModelSerializer(serializers.ModelSerializer):\r
        '''\r
        age = serializers.IntegerField(max_value=25, min_value=1, error_messages={\r
            'max_value': '年龄不能超过25岁',\r
            'min_value': '年龄不能小于1岁',\r
        })\r
        '''\r
        class Meta:\r
            model = Student\r
            fields = '__all__'\r
            extra_kwargs = {\r
                'age': {\r
                    'max_value': 25,\r
                    'min_value': 1,\r
                    'error_messages': {\r
                        'max_value': '年龄不能超过25岁',\r
                        'min_value': '年龄不能小于1岁',\r
                    },\r
                }\r
            }\r
    \`\`\`\r
\r
- \`views.py\`\r
\r
    \`\`\`python\r
    from django.shortcuts import render\r
    from rest_framework.views import APIView\r
    from rest_framework.response import Response\r
    from sers.models import Student\r
    from .serializers import StudentModelSerializer\r
    # Create your views here.\r
    \r
    class StudentAPIView(APIView):\r
        def get(self, request):\r
            '''获取所有学生信息'''\r
            instance_list = Student.objects.all()\r
            serializer = StudentModelSerializer(instance_list, many=True)\r
            serializer_data = serializer.data\r
            return Response(serializer_data)\r
    \r
        def post(self, request):\r
            '''添加学生信息'''\r
            serializer = StudentModelSerializer(data=request.data, many=False)\r
            if serializer.is_valid():\r
                serializer.save()\r
                return Response(serializer.data, status=201)\r
            return Response(serializer.errors, status=400)\r
    \r
    class StudentInfoAPIView(APIView):\r
        def get(self, request, pk):\r
            '''获取单个学生信息'''\r
            instance = Student.objects.get(pk=pk)\r
            serializer = StudentModelSerializer(instance)\r
            return Response(serializer.data) \r
    \r
        def put(self, request, pk):\r
            '''更新学生信息'''\r
            instance = Student.objects.get(pk=pk)\r
            serializer = StudentModelSerializer(instance, data=request.data, many=False, partial=True)\r
            if serializer.is_valid():\r
                serializer.save()\r
                return Response(serializer.data, status=200)\r
            return Response(serializer.errors, status=400)\r
        \r
        def delete(self, request, pk):\r
            '''删除学生信息'''\r
            Student.objects.filter(pk=pk).delete()\r
            return Response(status=204)\r
    \`\`\`\r
\r
    \r
\r
#### \`GenericAPIView\`\r
\r
##### import\r
\r
\`\`\`python\r
from rest_framework.generics import GenericAPIView\r
\`\`\`\r
\r
\r
\r
##### 详细说明\r
\r
通用视图类，继承自\`APIView\`，主要增加了操作序列化器和数据库查询的方法，作用是为下面的\`Mixin\`扩展类的执行提供方法支持以及方便我们复用自己的代码。通常会在使用时搭配一个或多个\`Mixin\`扩展类。**主要需要掌握的就是2属性和4方法。**\r
\r
##### 增加的属性和方法\r
\r
- **属性**\r
\r
    - **serializer_class**：指明视图使用的序列化器基类，值是一个序列化器类【掌握】\r
    - **\`queryset\`**：指明使用的数据查询集【掌握】\r
    - **\`pagination_class\`**：指明分页控制类\r
    - **\`filter_backends\`**：指明数据过滤控制后端，允许客户端通过地址栏传递参数\r
\r
- **函数**\r
\r
    - **\`get_serializer_class(self)\`**【掌握】\r
\r
        当出现一个视图类中出现多个序列化器时，可通过条件判断在\`get_serializer_class\`方法中通过返回不同的序列化器类名就可以让视图函数执行不同的序列化器对象了。\r
\r
        返回序列化器类，默认返回\`serializer_class\`，可以重写，如：\r
\r
        \`\`\`python\r
        \`\`\`\r
\r
    - **\`get_serializer(self, args, *kwargs)\`**【掌握】\r
\r
        返回序列化器对象，主要用来提供给\`Mixin\`混入类使用，如果在视图中想要获取序列化器对象，也可以直接调用此方法。\r
\r
        <div style="background-color: aqua">\r
            <p style="opacity: 0.8; color: green;">注意，该方法在提供序列化对象的时候，会向序列化器对象的context属性补充三个数据：request、\r
                format、view，这三个数据对象可以在序列化器内部使用。</p>\r
            <ul>\r
                <li>request：当前视图的请求对象</li>\r
                <li>view：当前请求的类试图对象</li>\r
                <li>format：当前请求期望返回的数据格式，不常用</li>\r
            </ul>\r
        </div>\r
\r
    - **\`get_queryset(self)\`**【掌握】\r
\r
        返回视图使用的查询集，主要用来提供给\`Mixin\`扩展类使用，是列表视图与详情视图获取数据的基础，默认返回\`queryset\`属性。可以重写，如：\r
\r
        \`\`\`python\r
        def get_queryset(self):\r
            user = self.request.user\r
            return user.accounts.all()\r
        \`\`\`\r
\r
    - **\`get_object(self)\`**【掌握】\r
\r
        返回详情视图所需的1个模型类数据对象，主要用来提供给\`Mixin\`混入类使用。在视图中可以调用该方法获取详情信息的模型类对象。==若详情访问的模型类对象不存在则返回404==。该方法会默认使用\`APIView\`提供的\`check_object_permissions\`方法检查当前客户端是否有权限访问。示例：\r
\r
        \`\`\`python\r
        class BookDetailView(GenericAPIView):\r
            queryset = BookInfo.objects.all()\r
            serializer_class = BookInfoSerializer\r
            \r
            def get(self, request, pk):\r
                '''获取一本书的信息'''\r
                book = self.get_object()\r
                serialzier = self.get_serializer(book)\r
                return Response(serializer.data)\r
        \`\`\`\r
\r
\r
\r
##### 示例\r
\r
\`\`\`python\r
from rest_framework.generics import GenericAPIView\r
\r
class StudentGenericAPIView(GenericAPIView):\r
    queryset = Student.objects.all()\r
    serializer_class = StudentModelSerializer\r
    \r
    def get(self, request, pk=None):\r
        '''获取所有学生信息'''\r
        instance_list = self.get_queryset()\r
        serializer = self.get_serializer(instance_list, many=True)\r
        return Response(serializer.data)\r
\r
    def post(self, request):\r
        '''添加学生信息'''\r
        serializer = self.get_serializer(data=request.data, many=False)\r
        if serializer.is_valid():\r
            serializer.save()\r
            return Response(serializer.data, status=201)\r
        return Response(serializer.errors, status=400)\r
\r
class CourseGenericAPIView(GenericAPIView):\r
    queryset = Course.objects.all()\r
    serializer_class = CourseModelSerializer\r
    \r
    def get(self, request, pk=None):\r
        '''获取所有学生信息'''\r
        instance_list = self.get_queryset()\r
        serializer = self.get_serializer(instance_list, many=True)\r
        return Response(serializer.data)\r
\r
    def post(self, request):\r
        '''添加学生信息'''\r
        serializer = self.get_serializer(data=request.data, many=False)\r
        if serializer.is_valid():\r
            serializer.save()\r
            return Response(serializer.data, status=201)\r
        return Response(serializer.errors, status=400)\r
\`\`\`\r
\r
\r
\r
### 五个视图混入类（扩展类）\r
\r
作用：**提供了几种后端视图（对数据资源进行增删改查）处理流程的实现。**\r
\r
这几个扩展类**需要搭配\`GenericAPIView\`通用视图基类**。因为其需要实现调用\`GenericAPIView\`提供的序列化器与数据库查询的方法。\r
\r
\r
\r
#### \`ListModelMixin\`\r
\r
列表视图混入类，提供**\`list(request, *args, **kwargs)\`**函数快速实现列表视图。返回200状态码。该\`Mixin\`的\`list\`方法会对数据进行过滤和分页。\r
\r
\r
\r
#### \`CreateModelMixin\`\r
\r
创建视图扩展类，提供**\`create(request, *args, kwargs)\`**函数快速实现创建资源的视图。成功返回201状态码。\r
\r
如果序列化器对前端发送的数据验证失败，则返回400错误。\r
\r
\r
\r
#### \`RetrieveModelMixin\`\r
\r
详情视图扩展类。提供**\`retrieve(request, *args, **kwargs)\`**函数，可以快速返回一个存在的对象。\r
\r
如果存在，返回2000，否则返回404。\r
\r
\r
\r
#### \`UpdateModelMixin\`\r
\r
更新视图扩展类。提供**\`update(request, *args, **kwargs)\`**函数，可以快速实现更新一个存在的对象。\r
\r
同时也提供**\`partial_update(request, *args, **kwargs)\`**函数，可以实现局部更新。\r
\r
成功返回200， 序列化器校验失败时，返回400错误。\r
\r
\r
\r
#### \`DestroyModelMixin\`\r
\r
删除视图扩展类，提供**\`destroy(request, *args, **kwargs)\`**函数，可以快速实现删除一个存在的数据对象。\r
\r
成功返回204， 不存在返回404。\r
\r
\r
\r
#### 示例\r
\r
\`\`\`python\r
from rest_framework.mixins import ListModelMixin\r
from rest_framework.mixins import CreateModelMixin\r
from rest_framework.mixins import RetrieveModelMixin\r
from rest_framework.mixins import UpdateModelMixin\r
from rest_framework.mixins import DestroyModelMixin\r
\r
class StudentListAPIView(GenericAPIView, ListModelMixin, CreateModelMixin):\r
    queryset = Student.objects.all()\r
    serializer_class = StudentModelSerializer\r
    def get(self, request):\r
        return self.list(request)\r
    \r
    def post(self, request):\r
        '''添加学生信息'''\r
        return self.create(request)\r
\r
\r
class StudentRetrieveAPIView(GenericAPIView, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin):\r
    queryset = Student.objects.all()\r
    serializer_class = StudentModelSerializer\r
    \r
    def get(self, request, pk):\r
        '''获取单个学生的信息'''\r
        return self.retrieve(request, pk=pk)\r
    \r
    def put(self, request, pk):\r
        '''更新学生信息'''\r
        return self.update(request, pk=pk, partial=True)\r
    \r
    def delete(self, request, pk):\r
        '''删除学生信息'''\r
        return self.destroy(request, pk=pk)\r
\`\`\`\r
\r
\r
\r
\r
\r
### 视图子类（9个）\r
\r
**视图子类 = 通用视图类(GenericAPIView) + 模型混入类(Mixins)**\r
\r
####  **\`ListAPIView\`**\r
\`GenericAPIView\` + \`ListModelMixin\`，列表视图子类，提供了\`get\`方法，内部调用了模型扩展类的\`list\`方法\r
\r
\r
\r
#### **\`CreateAPIView\`**\r
\`GenericAPIView\` + \`CreateModelMixin\`，创建视图子类，提供了\`post\`方法，内部调用了模型扩展类的\`create\`方法\r
\r
\r
\r
#### **\`RetrieveAPIView\`**\r
\`GenericAPIView\` + \`RetrieveModelMixin\`，详情视图子类，提供了\`get\`方法，内部调用了模型扩展类的\`retrieve\`方法\r
\r
\r
\r
#### **\`DestroyAPIView\`**\r
\`GenericAPIView\` + \`DestroyModelMixin\`，删除视图子类，提供了\`delete\`方法，内部调用了模型扩展类的\`destroy\`方法\r
\r
\r
\r
#### **\`UpdateAPIView\`**\r
\`GenericAPIView\` + \`UpdateModelMixin\`，更新视图子类，提供了\`put\`和\`patch\`方法，内部调用了模型扩展类的\`update\`方法或\`update_partial\`方法。\r
\r
\r
\r
#### **\`ListCreateAPIView\`**\r
\`GenericAPIView\` + \`ListModelMixin\` + \`CreateModelMixin\`，提供了\`get\`和\`post\`方法\r
\r
\r
\r
#### **\`RetrieveUpdateAPIView\`**\r
\`GenericAPIView\` + \`RetrieveModelMixin\` + \`UpdateModelMixin\`，提供了\`get\`、\`put\`、\`patch\`方法\r
\r
\r
\r
#### **\`RetrieveUpdateAPIView\`**\r
\`GenericAPIView\` + \`RetrieveModelMixin\` + \`UpdateModelMixin\`，提供了\`get\`、\`put\`、\`patch\`方法\r
\r
\r
\r
#### **\`RetrieveDestroySPIView\`**\r
\r
\`GenericAPIView\` + \`RetrieveModelMixin\` + \`DestroyModelMixin\`，提供了\`get\`、\`delete\`方法\r
\r
\r
\r
#### **\`RetrieveUpdateDestroyAPIView\`**\r
\r
\`GenericAPIView\` + \`RetrieveModelMixin\` +\` UpdateModelMixin\` + \`DestroyModelMixin\`，提供了\`get\`、\`put\`、\`patch\`、\`delete\`方法\r
\r
\r
\r
#### 示例\r
\r
\`\`\`python\r
from rest_framework.generics import ListAPIView\r
from rest_framework.generics import CreateAPIView\r
from rest_framework.generics import RetrieveAPIView\r
from rest_framework.generics import UpdateAPIView\r
from rest_framework.generics import DestroyAPIView\r
\r
class StuListAPIView(ListAPIView, CreateAPIView):\r
    queryset = Student.objects.all()\r
    serializer_class = StudentModelSerializer\r
\r
class StuRetrieveAPIView(RetrieveAPIView, UpdateAPIView, DestroyAPIView):\r
    queryset = Student.objects.all()\r
    serializer_class = StudentModelSerializer\r
\`\`\`\r
\r
\r
\r
\r
\r
### 视图集(\`ViewSet\`)\r
\r
#### 详细说明\r
\r
视图集(\`ViewSet\`)可以将一系列视图相关的代码逻辑和相关的\`Http\`请求动作封装到一个类中。一般使用的方法名是：\r
\r
- **\`list()\`**：提供一组数据\r
- **\`retrieve()\`**：提供单个数据\r
- **\`create()\`**：创建数据\r
- **\`update()\`**：更新某个数据\r
- **\`destroy()\`**：删除数据\r
\r
\`ViewSet\`视图集不再限制视图方法名只允许\`get()\`、\`post()\`等这种情况了，而是 实现允许开发者根据自己的需要自定义方法名，然后经过路由中使用\`Http\`和这些视图的方法名进行绑定调用。\r
\r
**视图集只在使用\`as_view()\`的方法时，允许将代表视图方法名的\`action\`动作与具体请求方式对应上。**\r
\r
\r
\r
#### 路由的写法\r
\r
==**views.StudentViewSet.as_view({"http请求方法名": "视图方法名", ...})**==\r
\r
\r
\r
#### 示例\r
\r
- \`views.py\`\r
\r
    \`\`\`python\r
    '''使用ViewSet实现五个功能'''\r
    from rest_framework.viewsets import ViewSet\r
    \r
    class StudentListViewSet(ViewSet):\r
        def list(self, request):\r
            '''方法名是可以改变的'''\r
            instance_list = Student.objects.all()\r
            serializer = StudentModelSerializer(instance_list, many=True)\r
            return Response(serializer.data)\r
        \r
        def create(self, request):\r
            serializer = StudentModelSerializer(data=request.data)\r
            serializer.is_valid(raise_exception=True)\r
            serializer.save()\r
            return Response(serializer.data, status=201)\r
        \r
        def retrieve(self, request, pk):\r
            instance = Student.objects.get(id=pk)\r
            serializer = StudentModelSerializer(instance)\r
            return Response(serializer.data)\r
        \r
        def update(self, request, pk):\r
            instance = Student.objects.get(id=pk)\r
            serializer = StudentModelSerializer(instance, data=request.data, partial=True)\r
            serializer.is_valid(raise_exception=True)\r
            serializer.save()\r
            return Response(serializer.data, status=200)\r
        \r
        def destroy(self, request, pk):\r
            Student.objects.filter(pk=pk).delete()\r
            return Response(status=204)\r
    \r
    \r
    \`\`\`\r
\r
- \`urls.py\`\r
\r
    \`\`\`python\r
    # 视图集的路由写法：views.StudentViewSet.as_view({"http请求方法名": "视图方法名", ...})\r
        path("students4/", views.StudentListViewSet.as_view({"get": "list", "post": "create"}), name="students4"),\r
        re_path(r"students4/(?P<pk>\\d+)/$", views.StudentListViewSet.as_view({\r
            "get": "retrieve",\r
            "put": "update",\r
            "delete": "destroy",\r
        }), name="student_info4"),\r
    \`\`\`\r
\r
\r
\r
### 通用视图集(GenericViewSet)\r
\r
可以使用\`GenericAPIView\`的属性和方法。\r
\r
#### 示例\r
\r
- \`views.py\`\r
\r
    \`\`\`python\r
    from rest_framework.viewsets import GenericViewSet\r
    \r
    class StudentGenericViewSet(GenericViewSet):\r
        queryset = Student.objects.all()\r
        serializer_class = StudentModelSerializer\r
    \r
        def list(self, request):\r
            instance_list = self.get_queryset()\r
            serializer = self.get_serializer(instance_list, many=True)\r
            return Response(serializer.data)\r
        \r
        def create(self, request):\r
            serializer = self.get_serializer(data=request.data)\r
            serializer.is_valid(raise_exception=True)\r
            serializer.save()\r
            return Response(serializer.data, status=201)\r
        \r
        def retrieve(self, request, pk):\r
            instance = self.get_object()\r
            serializer = self.get_serializer(instance)\r
            return Response(serializer.data)\r
        \r
        def update(self, request, pk):\r
            instance = self.get_object()\r
            serializer = self.get_serializer(instance, data=request.data, partial=True)\r
            serializer.is_valid(raise_exception=True)\r
            serializer.save()\r
            return Response(serializer.data, status=200)\r
        \r
        def destroy(self, request, pk):\r
            instance = self.get_object()\r
            instance.delete()\r
            return Response(status=204)\r
    \`\`\`\r
\r
- \`urls.py\`\r
\r
    \`\`\`python\r
    # GenericViewSet的路由写法\r
    path("students5/", views.StudentGenericViewSet.as_view({"get": "list", "post": "create"}), name="students5"),\r
    re_path(r"students5/(?P<pk>\\d+)/$", views.StudentGenericViewSet.as_view({\r
        "get": "retrieve",\r
        "put": "update",\r
        "delete": "destroy",\r
    })),\r
    \`\`\`\r
\r
    \r
\r
#### 使用通用视图集 + 模型扩展类\r
\r
- \`views.py\`\r
\r
    \`\`\`python\r
    # 通用视图集 + 模型扩展类，直接达到简写API的目的\r
    class StudentGenViewSet(GenericViewSet, ListModelMixin, CreateModelMixin, RetrieveModelMixin, \r
                            UpdateModelMixin, DestroyModelMixin):\r
        queryset = Student.objects.all()\r
        serializer_class = StudentModelSerializer \r
    \`\`\`\r
\r
- \`urls.py\`\r
\r
    \`\`\`python\r
    # 通用视图集 + 模型扩展类的路由函数\r
    path("students6/", views.StudentGenViewSet.as_view({"get": "list", "post": "create"}), name="students6"),\r
    re_path(r"students6/(?P<pk>\\d+)/$", views.StudentGenViewSet.as_view({\r
        "get": "retrieve",\r
        "put": "update",\r
        "delete": "destroy",\r
    }), name="student_info6"),\r
    \`\`\`\r
\r
    \r
\r
#### 使用\`ModelViewSet\`\r
\r
\`ModelViewSet\`继承于\`GenericViewSet\`, \`ListModelMixin\`, \`CreateModelMixin\`, \`RetrieveModelMixin\`, \`UpdateModelMixin\`, \`DestroyModelMixin\`。\r
\r
因此直接继承\`ModelViewSet\`就可以达到上面的效果。\r
\r
- \`views.py\`\r
\r
    \`\`\`python\r
    # 直接使用ModelViewSet实现五个功能\r
    from rest_framework.viewsets import ModelViewSet\r
    \r
    class StudentModelViewSet(ModelViewSet):\r
        queryset = Student.objects.all()\r
        serializer_class = StudentModelSerializer\r
    \`\`\`\r
\r
- \`urls.py\`\r
\r
    \`\`\`python\r
    # ModelViewSet的路由写法\r
    path("students7/", views.StudentModelViewSet.as_view({"get": "list", "post": "create"}), name="students7"),\r
    re_path(r"students7/(?P<pk>\\d+)/$", views.StudentModelViewSet.as_view({\r
        "get": "retrieve",\r
        "put": "update",\r
        "delete": "destroy",\r
    }), name="student_info7"),\r
    \`\`\`\r
\r
    \r
\r
#### 使用\`ReadOnlyModelViewSet\`\r
\r
与\`ModelViewSet\`不一样的是，\`ReadOnlyModelViewSet\`只继承了\`GenericViewSet\`、\`ListModelMixin\`、\`RetrieveModelMixin\`。\r
\r
- \`views.py\`\r
\r
    \`\`\`python\r
    # 使用ReadOnlyModelViewSet实现只读API\r
    from rest_framework.viewsets import ReadOnlyModelViewSet\r
    \r
    class StudentReadOnlyModelViewSet(ReadOnlyModelViewSet):\r
        queryset = Student.objects.all()\r
        serializer_class = StudentModelSerializer\r
    \`\`\`\r
\r
- \`urls.py\`\r
\r
    \`\`\`python\r
    # 使用ReadOnlyModelViewSet的路由写法\r
    path("students8/", views.StudentReadOnlyModelViewSet.as_view({"get": "list"}), name="students8"),\r
    re_path(r"students8/(?P<pk>\\d+)/$", views.StudentReadOnlyModelViewSet.as_view({\r
        "get": "retrieve",\r
    }), name="student_info8"),\r
    \`\`\`\r
\r
\r
\r
\r
\r
## 路由集(\`Routers\`)\r
\r
### 说明\r
\r
对于视图集，除了可以自己手动指明请求方式与动作\`action\`之间的对应关系之外，还可以使用\`Routers\`来帮助我们快速实现路由信息。如果是非视图集，不需要使用路由集\`Routers\`。\r
\r
DRF提供了两个\`Router\`类，使用方式一致。结果多一个或者少一个根目录的\`url\`地址的问题而已。\r
\r
- **\`SimpleRouter\`**：线上运营项目一般用这个\r
- **\`DefaultRouter\`**：本地开发，项目上线前一般使用这个\r
\r
需要导包：\r
\r
\`\`\`python\r
from rest_framework.routers imoprt SimpleRouter, DefaultRouter\r
\`\`\`\r
\r
注意：实际工作中其实很多接口并不能简单归类到数据库的增删改查里。例如登录，登出，投票等。\r
\r
\r
\r
### 使用方法\r
\r
\`\`\`python\r
from rest_framework.routers import DefaultRouter, SimpleRouter\r
\r
urlpatterns = [\r
    \r
]\r
\r
# 实例化路由对象\r
router = DefaultRouter()\r
# 注册视图集，每次注册一个视图集类，就需要调用register方法\r
router.register("students9", views.StudentModelViewSet, basename="students9")\r
\r
print(router.urls)  # 打印路由列表,router.urls是一个列表，里面存放的是路由对象\r
# 拼接路由列表到urlpatterns\r
urlpatterns += router.urls\r
\`\`\`\r
\r
\r
\r
### \`router\`形成\`url\`的方式\r
\r
- \`SimpleRouter\`\r
\r
    \`\`\`python\r
    SimpleRouter(prefix=路由前缀, viewset=视图集类, basename=路由别名)\r
    \`\`\`\r
\r
- \`DefaultRouter\`同此\r
\r
\r
\r
### 别名的生成方式\r
\r
如[使用方法](#使用方法)中的例子，最终会生成如下的路由别名：\r
\r
\`\`\`python\r
url: ^students9/$		name= students9-list\r
url: ^students9/(?P<pk>[^/.]+)/$		name= students9-detail\r
\`\`\`\r
\r
\r
\r
### 添加到\`django\`的\`urlpatterns\`中的方式\r
\r
1. 拼接\r
\r
    \`\`\`python\r
    urlpatterns += router.urls\r
    \`\`\`\r
\r
2. 直接在\`urlpatterns\`里\`include\`\r
\r
    \`\`\`python\r
    re_path("", include(router.urls)),\r
    \`\`\`\r
\r
\r
\r
### 视图集中附加\`action\`的声明\r
\r
在视图集中，如果想要让\`Router\`自动为自定义视图方法生成路由信息，需要使用\`rest_framework.decorators.action\`装饰器。\r
\r
\`action\`装饰器可以让开发者在视图中绑定要路由集生成的\`url\`地址。\r
\r
\`action\`装饰器可以接收三个参数（一般只是用前两个参数）：\r
\r
- **\`methods\`**：声明该\`action\`对应的请求方式，列表参数，值是一个列表如：\`["GET", "POST"]\`\r
- **\`detail\`**：声明该\`action\`的路径是否与单一资源对应，也就是是否生成附带\`pk\`值的\`url\`路径\r
    - \`True\`：表示路径格式是\`xxx/<pk>/路由后缀/\`\r
    - \`False\`：表示路径格式是\`xxx/路由后缀/\`\r
- **\`url_path\`**：声明该\`action\`的路由后缀。默认是视图方法名。\r
\r
**示例**：\r
\r
\`\`\`python\r
from rest_framework.viewsets import ModelViewSet\r
from rest_framework.decorators import action\r
\r
class StudentModelViewSet(ModelViewSet):\r
    queryset = Student.objects.all()\r
    serializer_class = StudentModelSerializer\r
\r
    @action(detail=False, methods=["get"], url_path="login")\r
    def login(self, request):\r
        '''自定义登录方法'''\r
        print(self.action) #获取视图方法名\r
        return Response({"msg": "登录成功"}, status=200)\r
    \r
# 此时的路径为：students9/login/\r
\`\`\`\r
\r
\r
\r
\r
\r
## 八大组件\r
\r
### 认证\`Authentication\`\r
\r
#### 基础使用\r
\r
可以在配置文件中配置全局默认的认证方式/认证方案。\r
\r
开发中常见的认证方式：\`cookie\`、\`session\`、\`token\`。\r
\r
于\`rest_framework/settings.py\`中有默认的配置文件（只会影响DRF框架里的认证）：\r
\r
\`\`\`python\r
REST_FRAMEWORK = {\r
    # 配置默认认证方式的选项\r
    'DEFAULT_AUTHENTICATION_CLASSES': [\r
        'rest_framework.authentication.BasicAuthentication', # Basic认证\r
        'rest_framework.authentication.SessionAuthentication', # Session认证\r
    ]\r
}\r
\`\`\`\r
\r
也可以在具体的视图类中通过设置**\`authentication_classes\`**类属性来设置单独的不同的认证方式:\r
\r
\`\`\`python\r
from rest_framework.authentication import SessionAuthentication, BasicAuthentication\r
from rest_framework.views import APIView\r
\r
class ExampleView(APIView):\r
    authentication_classes = [SessionAuthentication, BasicAuthentication]\r
    def get(self, request):\r
        pass\r
\`\`\`\r
\r
认证失败会有两种可能的返回值，这个需要配合权限组件来使用：\r
\r
- **401\`Unauthorized\`**    未认证\r
- **403\`Permission Denied\`**    权限被禁止\r
\r
\r
\r
#### 自定义认证方式\r
\r
可以写一个新类，通过**继承\`BaseAuthentication\`**以及**重写\`authenticate\`函数**来自定义认证方式。如：\r
\r
- \`authentication.py\`\r
\r
    \`\`\`python\r
    from rest_framework.authentication import BaseAuthentication\r
    from django.contrib.auth.models import User\r
    \r
    class CustomAuthentication(BaseAuthentication):\r
        def authenticate(self, request):\r
            '''核心认证方法'''\r
            user = request.query_params.get('user')\r
            password = request.query_params.get('password')\r
            if user != 'acs' or password != '123':\r
                return None # 返回None相同于认证失败\r
            try:\r
                user = User.objects.get(username=user, is_superuser=True, is_active=True)\r
                return (user, None)  # 返回用户和None（没有认证凭据）\r
            	#(user, auth)，第二个值一般用于区别该用户是通过什么方式认证的，可以通过request.auth获取该用户的认证方式\r
            except User.DoesNotExist:\r
                return None\r
    \`\`\`\r
\r
- \`views.py\`\r
\r
    \`\`\`python\r
    from rest_framework.views import APIView\r
    from rest_framework.response import Response\r
    from .authentication import CustomAuthentication\r
    \r
    class AuthenticationView(APIView):\r
        # 局部认证属性，支持多个认证方式\r
        authentication_classes = [CustomAuthentication]\r
        def get(self, request):\r
            print(request.user)\r
            return Response({"message": "Hello, world!"})\r
    \`\`\`\r
\r
甚至可以加入全局配置中：\r
\r
\`\`\`python\r
REST_FRAMEWORK = {\r
    # 配置认证方式的选项\r
    'DEFAULT_AUTHENTICATION_CLASSES': [\r
        'component.authentication.CustomAuthentication', # 自定义认证\r
        'rest_framework.authentication.BasicAuthentication', # Basic认证\r
        'rest_framework.authentication.SessionAuthentication', # Session认证\r
    ]\r
}\r
\`\`\`\r
\r
\r
\r
\r
\r
### 权限\`Permissions\`\r
\r
#### 基础使用\r
\r
权限控制可以限制用户对于视图的访问和对于具体模型对象的访问。\r
\r
- 在执行\`APIView\`视图的\`dispatch()\`方法中的\`initial()\`方法时，会先进行对视图访问权限的判断。\r
- 在执行\`GenericAPIView\`通过\`get_object()\`获取具体的模型对象时，会进行模型对象访问权限的判断。\r
\r
\r
\r
可以在配置文件\`rest_framework/settings.py\`中全局设置默认的权限管理类，如：\r
\r
\`\`\`python\r
REST_FRAMEWORK = {\r
    'DEFAULT_PERMISSION_CLASSES': [\r
    	'rest_framework.permissions.AllowAny', #允许任何用户访问站点视图\r
    ]\r
}\r
\`\`\`\r
\r
\r
\r
也可以在具体的视图类中通过属性\`permission_classes\`属性来进行局部设置，如：\r
\r
\`\`\`python\r
from rest_framework.permissions import IsAuthenticated\r
from rest_framework.authentication import SessionAuthentication\r
class PermissionAPIView(ModelViewSet):\r
    authentication_classes = [SessionAuthentication]\r
    permission_classes = [IsAuthenticated] #局部配置权限\r
    queryset = Student.objects.all()\r
    serializer_class = StudentModelSerializer\r
\`\`\`\r
\r
\r
\r
常用权限列表： \r
\r
\`\`\`python\r
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser, IsAuthenticatedOrReadOnly\r
\`\`\`\r
\r
| 权限                        | 作用                                         |\r
| --------------------------- | -------------------------------------------- |\r
| \`AllowAny\`                  | 允许任何用户                                 |\r
| \`IsAuthenticated\`           | 用户访问视图必须登录(\`request.user\`必须有值) |\r
| \`IsAdminUser\`               | 用户必须登录且必须为管理员                   |\r
| \`IsAuthenticatedOrReadOnly\` | 登录的用户可以进行修改，没有登录则只能查看   |\r
\r
\r
\r
#### 自定义权限\r
\r
如需自定义权限，需继承\`rest_framework.permissions.BasePermission\`父类，并实现以下两个方法的至少一个方法：\r
\r
- **\`has_permission(self, request, view)\`**：是否可以访问视图，\`view\`表示当前的视图对象，\`request\`可以通过\`user\`属性获取当前用户。\r
- **\`has_object_permission(self, request, view, obj)\`**：是否可以访问模型对象，\`view\`表示当前视图，\`obj\`为模型数据对象。\r
\r
示例：\r
\r
- \`permissions.py\`\r
\r
    \`\`\`python\r
    from rest_framework.permissions import BasePermission\r
    \r
    class IsVip(BasePermission): #VIP权限\r
        '''\r
        自定义权限，可用于全局配置，也可以用于局部配置\r
        '''\r
        def has_permission(self, request, view):\r
            user = request.query_params.get("id")\r
            return user == "vip"\r
        \r
        def has_object_permission(self, request, view, obj):\r
            from sers.models import Student\r
            if isinstance(obj, Student):\r
                user = request.query_params.get("id")\r
                return user == "vip"\r
    \`\`\`\r
\r
- \`views.py\`\r
\r
    \`\`\`python\r
    from rest_framework.viewsets import ModelViewSet\r
    from demo.serializers import StudentModelSerializer\r
    from rest_framework.authentication import SessionAuthentication\r
    from rest_framework.permissions import IsAuthenticated\r
    from .permissions import IsVip\r
    class PermissionAPIView(ModelViewSet):\r
        authentication_classes = [SessionAuthentication]\r
        permission_classes = [IsVip]\r
        queryset = Student.objects.all()\r
        serializer_class = StudentModelSerializer\r
    \`\`\`\r
\r
\r
\r
同认证类，权限自定义类也可以放入默认权限设置中：\r
\r
\`\`\`python\r
REST_FRAMEWORK = {\r
    # 配置认证方式的选项\r
    'DEFAULT_AUTHENTICATION_CLASSES': [\r
        'component.authentication.CustomAuthentication', # 自定义认证\r
        'rest_framework.authentication.BasicAuthentication', # Basic认证\r
        'rest_framework.authentication.SessionAuthentication', # Session认证\r
    ],\r
\r
    'DEFAULT_PERMISSION_CLASSES': [\r
        # 'rest_framework.permissions.IsAuthenticatedOrReadOnly', # 认证权限\r
        'component.permissions.IsVip',\r
    ],\r
}\r
\`\`\`\r
\r
\r
\r
#### 认证与权限的区别\r
\r
- 认证主要是识别客户端的访问者的身份，但是不能拦截客户端访问\r
- 权限基于认证来实现，但是可以针对不同身份的用户进行对应的**视图、模型访问的拦截**\r
\r
\r
\r
\r
\r
### 限流Throttling\r
\r
#### 基础使用\r
\r
- 可以对接口访问的频次进行限制，以实现特定的业务\r
- 一般用于付费购买次数，投票等场景使用\r
\r
可以在配置文件中，使用\`DEFAULT_THROTTLE_CLASSES\`和\`DEFAULT_THROTTLE_RATES\`进行全局配置。\r
\r
\`\`\`python\r
REST_FRAMEWORK = {\r
    # 限流全局配置\r
    'DEFAULT_THROTTLE_CLASSES': [\r
    	'rest_framework.throttling.AnonRateThrottle', #未认证用户(未登录用户)\r
    	'rest_framework.throttling.UserRateThrottle', #已认证用户(已登录用户)\r
    ],\r
    \r
    #频率限制全局配置\r
    'DEFAULT_THROTTLE_RATES': {\r
        # s：秒， m：分钟， h：小时， d：天\r
        'anon': '2/day', #未登录用户访问频率的限制，实际上DRF只识别首字母(d)，但是为了提高代码的维护性，建议写完整单词(day)\r
        'user': '5/day', #针对登录用户的访问频率进行限制\r
    }\r
}\r
\`\`\`\r
\r
一旦用户超过访问次数，则会返回**429(Too Many Requests)**。当服务器重启时，这个限制会清零。\r
\r
关于限流类里访问频率的首字母，可以在\`rest_framework.throttling.parse_rate\`里自行添加配置。常用且默认的有：\r
\r
1. \`s\`：秒\r
2. \`m\`：分\r
3. \`h\`：时\r
4. \`d\`：天\r
\r
也可以在具体的视图中通过**\`throttle_classes\`**属性来配置，如：\r
\r
\`\`\`python\r
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle\r
class ThrottlingAPIView(APIView):\r
    throttle_classes = [AnonRateThrottle, UserRateThrottle]\r
    def get(self, request):\r
        return Response("ok")\r
\`\`\`\r
\r
\r
\r
#### 可选限流类\r
\r
- **\`AnonRateThrottle\`**\r
\r
    限制所有匿名未认证用户，使用\`IP\`区分用户。使用\`DEFAULT_THROTTLE_RATES[’anon‘]\`来设置频次。\r
\r
- **\`UserRateThrottle\`**\r
\r
    限制认证用户，使用\`User\`模型的主键\`id\`来区分。使用\`DEFAULT_THROTTLE_RATES[’user‘]\`来设置频次。\r
\r
- **\`ScopedRateThrottle\`**\r
\r
    限制用户对于每个视图的访问频次，使用\`ip\`或者\`user id\`来区分。需要在视图中设定**\`throttle_scope\`**属性，如：\r
\r
    - \`views.py\`\r
\r
        \`\`\`python\r
        class ThrottlingAPIView(APIView):\r
            # throttle_classes = [AnonRateThrottle, UserRateThrottle]\r
            throttle_scope = "throttle" #重点\r
            def get(self, request):\r
                return Response("ok")\r
        \`\`\`\r
\r
    - 主应用中\`settings.py\`\r
\r
        \`\`\`python\r
        REST_FRAMEWORK = {\r
            # 限流全局配置\r
            'DEFAULT_THROTTLE_CLASSES': [\r
                'rest_framework.throttling.AnonRateThrottle', #未认证用户(未登录用户)\r
                'rest_framework.throttling.UserRateThrottle', #已认证用户(已登录用户)\r
                'rest_framework.throttling.ScopedRateThrottle', #以视图为识别单位进行限流\r
            ],\r
            \r
            'DEFAULT_THROTTLE_RATES': {\r
                'anon': '2/day', #未登录用户访问频率的限制，实际上DRF只识别首字母(d)，但是为了提高代码的维护性，建议写完整单词(day)\r
                'user': '5/day', #针对登录用户的访问频率进行限制\r
                'throttle': '1/m' #对于某个视图而使用的频率限制，对应视图中的\`throttle_scope\`属性\r
            }\r
        }\r
        \`\`\`\r
\r
\r
\r
\r
\r
\r
### 过滤Filtering\r
\r
#### 基础使用\r
\r
对于列表数据可能需要根据字段进行过滤，可以通过添加\`django-filter\`扩展来增强支持。\r
\r
\`\`\`python\r
pip install django-filter\r
\`\`\`\r
\r
并将其添加进\`settings.py\`：\r
\r
\`\`\`python\r
INSTALLED_APPS = [\r
    ...\r
    'django_filters',\r
]\r
\`\`\`\r
\r
然后在配置文件中增加过滤器类的全局设置：\r
\r
\`\`\`python\r
REST_FRAMEWORK = {\r
    ...\r
    #查询过滤，全局配置\r
    'DEFAULT_FILTER_BACKENDS': [\r
        'django_filters.rest_framework.DjangoFilterBackend'\r
    ]\r
}\r
\`\`\`\r
\r
也可以为当前列表视图的查询过滤器类单独设置：\r
\r
\`\`\`python\r
from django_filters.rest_framework import DjangoFilterBackend\r
filter_backends = [DjangoFilterBackend]\r
\`\`\`\r
\r
在视图中添加类属性\`filterset_fields\`（\`django4.0\`之前是\`filter_fields\`），指定可以过滤的字段：\r
\r
\`\`\`python\r
from rest_framework.generics import ListAPIView\r
from django_filters.rest_framework import DjangoFilterBackend\r
class FilterAPIView(ListAPIView):\r
    queryset = Student.objects.all()\r
    serializer_class = StudentModelSerializer\r
    filter_backends = [DjangoFilterBackend]\r
    # 设置当前列表视图的过滤字段\r
    filterset_fields = ["sex", "class_name"]\r
\`\`\`\r
\r
在浏览器中输入地址，加上过滤的字段名：\r
\r
\`\`\`http\r
http://127.0.0.1:8000/component/filter/?class_name=wqdwd\r
\`\`\`\r
\r
最终显示：\r
\r
\`\`\`json\r
HTTP 200 OK\r
Allow: GET, HEAD, OPTIONS\r
Content-Type: application/json\r
Vary: Accept\r
\r
[\r
    {\r
        "id": 1,\r
        "name": "hsz",\r
        "sex": true,\r
        "age": 18,\r
        "description": "why7wdhgwu8 j dionmwd",\r
        "class_name": "wqdwd"\r
    }\r
]\r
\`\`\`\r
\r
\r
\r
\r
\r
### 排序Ordering\r
\r
#### 基础使用\r
\r
对于列表数据，\`Rest Framework\`提供了\`OrderingFilter\`过滤器来帮助我们快速指定字段进行排序.\r
\r
使用方法：\r
\r
在类视图中设置\`filter_backends\`，使用\`rest_framework.filters.OrderingFilter\`过滤器，\`DRF\`会在请求的查询字符串参数中检查是否包含了\`ordering\`参数，如果包含了\`ordering\`参数，则按照\`ordering\`参数指明的排序字段对数据集进行排序。前端可以传递\`ordering\`参数的可选字段值需要在\`ordering_fields\`属性中指明。\r
\r
**配置文件**\r
\r
\`\`\`python\r
REST_FRAMEWORK = {\r
    ...\r
    'DEFAULT_FILTER_BACKENDS': [\r
        # 'django_filters.rest_framework.DjangoFilterBackend', #过滤\r
        'rest_framework.filters.OrderingFilter' #排序\r
    ]\r
}\r
\`\`\`\r
\r
\r
\r
**注意**\r
\r
因为排序和过滤公用了一个配置项，所以如果排序和过滤要一起使用，则必须整个项目，要么全局一起设置过滤排序，要么一起局部过滤排序。绝不能出现一个全局，一个局部的情况，否则局部\`filter_backends\`会覆盖全局的\`DEFAULT_FILTER_BACKENDS\`配置。\r
\r
\r
\r
#### 示例\r
\r
**不使用过滤的情况下**\r
\r
- \`views.py\`\r
\r
    \`\`\`python\r
    from rest_framework.generics import ListAPIView\r
    \r
    class OrderAPIView(ListAPIView):\r
        queryset = Student.objects.all()\r
        serializer_class = StudentModelSerializer\r
        # 当前列表视图的排序字段\r
        ordering_fields = ["id", "age"]\r
    \`\`\`\r
\r
- \`http\`\r
\r
    \`\`\`http\r
    http://127.0.0.1:8000/component/order/?ordering=id    id表示使用id这个字段升序排列\r
    \`\`\`\r
\r
    \`\`\`http\r
    http://127.0.0.1:8000/component/order/?ordering=-id    -id表示使用id这个字段降序排列\r
    \`\`\`\r
\r
**使用过滤的情况下，排除配置项冲突**\r
\r
- \`views.py\`\r
\r
    \`\`\`python\r
    from rest_framework.filters import OrderingFilter\r
    from django_filters.rest_framework import DjangoFilterBackend\r
    class OrderAPIView(ListAPIView):\r
        queryset = Student.objects.all()\r
        serializer_class = StudentModelSerializer\r
        #局部设置过滤器类与排序类\r
        filter_backends = [DjangoFilterBackend, OrderingFilter] #会覆盖全局的DEFAULT_FILTER_BACKENDS，因此需要两个配置项\r
        ordering_fields = ["id", "age"]\r
        filterset_fields = ['sex']\r
    \`\`\`\r
\r
    \r
\r
\r
\r
### 分页Pagination\r
\r
#### 基本使用\r
\r
因为\`Django\`默认提供的分页主要用于前后端不分离的业务场景，所以\`DRF\`也提供了针对接口数据的分页支持。\r
\r
可以在配置文件\`settings.py\`中设置全局的分页方式。如：\r
\r
\`\`\`python\r
REST_FRAMEWORK = {\r
    #列表分页全局配置\r
    #'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',  # 分页类，参数是limit和offset\r
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',  # 分页类，参数是page\r
    'PAGE_SIZE': 2,  # 每页显示的数量\r
}\r
\`\`\`\r
\r
也可在视图类里局部设置分页类属性（\`pageination_class\`）:\r
\r
\`\`\`python\r
from rest_framework.pagination import PageNumberPagination\r
from rest_framework.pagination import LimitOffsetPagination\r
class PageAPIView(ListAPIView):\r
    queryset = Student.objects.all()\r
    serializer_class = StudentModelSerializer\r
    pagination_class = None  # 禁用分页，如果需要分页可以设置为自定义分页类\r
\`\`\`\r
\r
\r
\r
#### 可选分页类\r
\r
- **\`PageNumberPagination\`**，参数为\`limit\`和\`offset\`\r
- **\`LimitOffsetPagination\`**，参数为\`page\`\r
\r
**\`PageNumberPaginatio\`有如下可选属性参数：**\r
\r
| 参数名                  | 作用                                                         |\r
| ----------------------- | ------------------------------------------------------------ |\r
| \`page_size\`             | 每页数据量的数量，默认为\`None\`                               |\r
| \`page_query_param\`      | 前端发送的页数关键字，默认为\`page\`                           |\r
| \`page_size_query_param\` | 前端发送的参数名，这个参数名可以修改每页数据的数量，默认为\`None\`，也就是不允许前端修改每一页数量 |\r
| \`max_page_size\`         | 前端最多能设置的每页数量                                     |\r
\r
**\`LimitOffsetPagination\`子类有如下可选参数：**\r
\r
| 参数名               | 作用                                                         |\r
| -------------------- | ------------------------------------------------------------ |\r
| \`default_limit\`      | 默认每页显示的数量，默认值与\`page_size\`一致                  |\r
| \`max_limit\`          | 最大每页显示的数量，限制地址栏对每一页数据展示的最大数量，相当于\`max_page_size\`，默认为\`None\` |\r
| \`limit_query_param\`  | 可以通过查询参数来设置每页显示的数量，相当于\`page_size_query_param\` |\r
| \`offset_query_param\` | 可以通过查询参数来设置偏移量，相当于\`page_query_param\`       |\r
\r
*\`offset\`为偏移量，表示从第几条数据开始分页返回，其实就是类似于\`page\`参数*\r
\r
\r
\r
#### 返回数据的格式\r
\r
\`\`\`json\r
{\r
    "count": 8, #本次分页的总数据量\r
    "next": "http://127.0.0.1:8000/component/page/?limit=2&offset=2", #下一页数据所在地址，以LimitOffset为分页类\r
    "previous": null, #上一页数据的地址\r
    "results": [ # 当前页List数据的内容\r
        {\r
            "id": 1,\r
            "name": "hsz",\r
            "sex": true,\r
            "age": 18,\r
            "description": "why7wdhgwu8 j dionmwd",\r
            "class_name": "wqdwd"\r
        },\r
        {\r
            "id": 3,\r
            "name": "小明",\r
            "sex": true,\r
            "age": 99,\r
            "description": "dwdwd",\r
            "class_name": "三年级一班"\r
        }\r
    ]\r
}\r
\`\`\`\r
\r
\`\`\`json\r
{\r
    "count": 8,\r
    "next": "http://127.0.0.1:8000/component/page/?page=2", #下一页数据所在地址，以PageNumber为分页类\r
    "previous": null,\r
    "results": [\r
        {\r
            "id": 1,\r
            "name": "hsz",\r
            "sex": true,\r
            "age": 18,\r
            "description": "why7wdhgwu8 j dionmwd",\r
            "class_name": "wqdwd"\r
        },\r
        {\r
            "id": 3,\r
            "name": "小明",\r
            "sex": true,\r
            "age": 99,\r
            "description": "dwdwd",\r
            "class_name": "三年级一班"\r
        }\r
    ]\r
}\r
\`\`\`\r
\r
\r
\r
#### 自定义分页类\r
\r
例如在当前子应用下创建一个自定义分页类\`pagination.py\`，代码：\r
\r
- \`pagination.py\`\r
\r
    \`\`\`python\r
    from rest_framework.pagination import PageNumberPagination\r
    from rest_framework.pagination import LimitOffsetPagination\r
    \r
    class CustomPageNumberPagination(PageNumberPagination):\r
        page_size = 2  # 每页显示的数量\r
        page_query_param = 'page'  # 可以通过查询参数来设置页码\r
        page_size_query_param = 'page_size'  # 可以通过查询参数来设置每页显示的数量\r
        max_page_size = 10  # 最大每页显示的数量\r
        \r
    class CustomLimitOffsetPagination(LimitOffsetPagination):\r
        default_limit = 2  # 默认每页显示的数量\r
        max_limit = 10  # 最大每页显示的数量\r
        limit_query_param = 'limit'  # 可以通过查询参数来设置每页显示的数量\r
        offset_query_param = 'offset'  # 可以通过查询参数来设置偏移量\r
    \`\`\`\r
\r
- \`views.py\`\r
\r
    \`\`\`python\r
    from .pagination import CustomPageNumberPagination\r
    \r
    class CustomPageAPIView(ListAPIView):\r
        queryset = Student.objects.all()\r
        serializer_class = StudentModelSerializer\r
        pagination_class = CustomPageNumberPagination  # 使用自定义分页类\r
        \r
    class CustomLimitOffsetAPIView(ListAPIView):\r
        queryset = Student.objects.all()\r
        serializer_class = StudentModelSerializer\r
        pagination_class = CustomLimitOffsetPagination\r
    \`\`\`\r
  \r
- \`url\`\r
\r
    \`\`\`http\r
    http://127.0.0.1:8000/component/customPage/?page=2&page_size=1\r
    \`\`\`\r
\r
    \`\`\`http\r
    http://127.0.0.1:8000/component/customLimitOffsetPage/?limit=2&offset=2\r
    \`\`\`\r
\r
- 返回的数据\r
\r
    \`\`\`json\r
    {\r
        "count": 8,\r
        "next": "http://127.0.0.1:8000/component/customPage/?page=3&page_size=1",\r
        "previous": "http://127.0.0.1:8000/component/customPage/?page_size=1",\r
        "results": [\r
            {\r
                "id": 3,\r
                "name": "小明",\r
                "sex": true,\r
                "age": 99,\r
                "description": "dwdwd",\r
                "class_name": "三年级一班"\r
            }\r
        ]\r
    }\r
    \`\`\`\r
\r
    \`\`\`json\r
    {\r
        "count": 8,\r
        "next": "http://127.0.0.1:8000/component/customLimitOffsetPage/?limit=2&offset=4",\r
        "previous": "http://127.0.0.1:8000/component/customLimitOffsetPage/?limit=2",\r
        "results": [\r
            {\r
                "id": 6,\r
                "name": "小明",\r
                "sex": true,\r
                "age": 18,\r
                "description": "dwdwd",\r
                "class_name": "三年级一班"\r
            },\r
            {\r
                "id": 7,\r
                "name": "小明",\r
                "sex": true,\r
                "age": 101,\r
                "description": "dwdwd",\r
                "class_name": "三年级一班"\r
            }\r
        ]\r
    }\r
    \`\`\`\r
\r
    \r
\r
\r
\r
### 异常处理Exceptions\r
\r
#### 存在原因\r
\r
\`DRF\`本身在\`APIView\`提供了异常处理，但是针对\`DRF\`内部现有的接口开发相关的异常进行格式处理，但是开发中我们还会使用到各种的数据或者进行各种网络请求，这些都有可能导致异常且这些异常在\`DRF\`中是没有进行处理的，所以就会冒泡给\`Django\`框架了，\`Django\`框架会进行组织错误信息，作为\`html\`页面返回给客客户端，在前后端分离项目中，可能\`js\`无法理解或者无法接收到这种数据，甚至导致\`js\`出现错误的情况。因此为了避免这种情况，可以自定义一个属于自己的异常处理函数，对于\`DRF\`无法处理的异常，我们自己编写异常处理的代码逻辑，使其不会冒泡到\`Django\`。\r
\r
#### 基础使用\r
\r
在\`settings.py\`中声明异常配置类：\r
\r
\`\`\`python\r
REST_FRAMEWORK = {\r
    ...\r
    # 自定义异常处理函数\r
    'EXCEPTION_HANDLER': 'rest_framework.views.exception_handler',  # 异常处理函数，这个是DRF默认的\r
}\r
\`\`\`\r
\r
自定义异常函数（假设在\`demo\`应用下的\`exceptions.py\`）：\r
\r
\`\`\`python\r
from rest_framework.views import exception_handler, Response\r
\r
def custom_exception_handler(exc, context):\r
    '''\r
    自定义异常处理函数\r
    exc：异常示例对象，发生异常时实例化出来的\r
    context：字典，异常发生时python解释器会自动收集异常的执行上下文信息。报错时会包含请求信息、视图函数信息等\r
    '''\r
    # 1. 先让DRF处理它能处理的异常\r
    response = exception_handler(exc, context)\r
    if response is None:\r
        # 如果DRF没有处理这个异常，则返回一个自定义的响应\r
        if isinstance(exc, ValueError):\r
            return Response({"error": "自定义的ValueError异常处理"}, status=400)\r
        elif isinstance(exc, KeyError):\r
            return Response({"error": "自定义的KeyError异常处理"}, status=400)\r
        else:\r
            # 如果DRF没有处理这个异常，且不是ValueError或KeyError，则返回一个500错误\r
            return Response({"error": "服务器内部错误"}, status=500)\r
    # 2. 如果DRF处理了这个异常，则返回DRF处理后的响应\r
    return response\r
\`\`\`\r
\r
此时需要把\`settings.py\`中的异常处理函数改为：\r
\r
\`\`\`python\r
REST_FRAMEWORK = {\r
    ...\r
    # 自定义异常处理函数\r
    'EXCEPTION_HANDLER': 'demo.exceptions.custom_exception_handler',  # 自定义异常处理函数\r
}\r
\`\`\`\r
\r
\r
\r
#### \`DRF\`的内置异常类\r
\r
| 类名                   | 解释                   |\r
| ---------------------- | ---------------------- |\r
| \`APIException\`         | 所有异常的父类         |\r
| \`ParseError\`           | 解析错误               |\r
| \`AuthenticationFailed\` | 认证失败               |\r
| \`NotAuthenticated\`     | 尚未认证               |\r
| \`PermissionDenied\`     | 权限拒绝               |\r
| \`NotFound\`             | 404未找到              |\r
| \`MethodNotAllowed\`     | 请求方式不支持         |\r
| \`NotAcceptable\`        | 要获取的数据格式不支持 |\r
| \`Throttled\`            | 超过限流次数           |\r
| \`ValidationError\`      | 校验失败               |\r
| \`UnsupportedMediaType\` | 不支持的媒体格式       |\r
\r
\r
\r
### 自动生成接口文档\r
\r
#### 接口文档说明\r
\r
\`DRF\`可以自动生成接口文档，以网页的方式呈现。自动接口文档生成的是继承自\`APIView\`及其子类的视图。\r
\r
\r
\r
#### coreapi\r
\r
- 安装\r
\r
    \`\`\`python\r
    pip install coreapi\r
    pip install setuptools #前置模块\r
    \`\`\`\r
\r
- 在\`settings.py\`中配置接口文档的模块\r
\r
    \`\`\`python\r
    INSTALLED_APPS = [\r
    	...\r
        'coreapi', #DRF提供的核心API功能\r
    ]\r
    \r
    REST_FRAMEWORK = {\r
        ...\r
        # 自定义API文档生成器\r
        'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',  # 使用CoreAPI生成API文档\r
    }\r
    \`\`\`\r
\r
- 在总路由中添加接口文档路径\r
\r
    \`\`\`python\r
    from rest_framework.documentation import include_docs_urls\r
    \r
    urlpatterns = [\r
        ...\r
        path('docs/', include_docs_urls(title='Dtest API Documentation', public=True, authentication_classes=[])),\r
    ]\r
    \`\`\`\r
\r
\r
\r
#### 文档描述说明的定义位置\r
\r
- 单一方法的视图，直接使用类视图的文档字符串，如：\r
\r
    \`\`\`python\r
    class DocumentationAPIView(ModelViewSet):\r
        """\r
        测试API文档\r
        """\r
        serializer_class = StudentModelSerializer\r
        queryset = Student.objects.all()\r
    \`\`\`\r
\r
- 多方法视图，在类视图的文档字符串中分开方法定义：\r
\r
    \`\`\`python\r
    class ModelAPIView(ModelViewSet):\r
        """\r
        list 返回学生信息\r
        create 创建学生信息\r
        """\r
        serializer_class = StudentModelSerializer\r
        queryset = Student.objects.all()\r
    \`\`\`\r
\r
     \r
\r
## Admin站点管理\r
\r
### 组件说明\r
\r
\`Django\`内置了一个强大的组件叫\`Admin\`，提供给网站管理员快速开发运营后台的管理站点。\r
\r
提醒：虽然\`Django\`内置的运营站点功能齐全，但是在实际工作中如果要实现高定制性后台运营站点，很多公司都是自己另行从0开始搭建或使用第三方插件对\`Admin\`站点进行增强美化。\r
\r
\`Admin\`站点默认并没有提供其他操作给我们，所以一切功能都需要我们进行配置，在项目中，我们每次创建子应用的时候都会存在一个\`admin.py\`文件，这个文件就是用于配置\`Admin\`站点功能的文件。这些\`admin.py\`文件最终都会被项目运营的时候被\`Django\`加载并且识别。\r
\r
### RBAC权限认证机制\r
\r
RBAC(Role Base Access Control)，基于角色分配的访问控制权限。\r
\r
在开发中，我们一般用于项目权限的分配机制无非三种：RBAC，Auth授权认证，RLS(Row Level Security，行级数据安全)。\r
\r
在网站后台运营站点这种单个站点内部，单个站点集群场景下，一般使用的都是RBAC。\r
\r
在对外开发的业务站点中，基于不同的渠道，不同的领域，不同的站点之间，一般都是使用OAuth2.0授权认证。\r
\r
在对外开发的站点服务，如果配置多台前后台的租出模式，多数使用RLS权限机制。\r
\r
### RBAC的实现\r
\r
在实现过程中，因为项目业务的复杂程度不一致，所以存在有3表RBAC或5表RBAC的实现方案。\`Django\`的\`Admin\`站点实际上就是5表实现的方式扩展出来的6表RBAC认证机制。\r
\r
#### 3表RBAC\r
\r
使用三张表保存了权限相关的所有数据，这3张表分别是用户表(User)，组表(role/group/department)，权限表(permission/auth)。\r
\r
常见的场景有：单个网站，小论坛，小商城，普通的后台站点。\r
\r
`;export{r as default};

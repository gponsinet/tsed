# Filters

Filters feature lets you create custom decorators that will be 
used on the methods parameters like @@BodyParams@@ or @@Locals@@.

### Example

This example shows you how you can implement a filter and decorator to use these, on a method Controller.
In this case, we need to retrieve the body content from an Express.Request.

So to do that, you must create a class and annotate it with the @@Filter@@
decorator and in option, implement the @@IFilter@@ interface:

<<< @/docs/docs/snippets/filters/basic-filter.ts

Then create the decorator. This decorator will be used on a controller method.

<<< @/docs/docs/snippets/filters/filter-decorator.ts

And finally you can use your custom filter on your controller/middleware:

<<< @/docs/docs/snippets/filters/filter-usage.ts

### UseFilter Options
<Badge type="warning" text="deprecated" />

@@UseFilter@@ allows you to register your custom decorator with few options as following:

- `paramType` (ParamTypes): Parameter type like BODY, QUERY, PARAMS, etc...,
- `required` (boolean, optional): Throw an error if the value is undefined,
- `expression` (string, optional): An expression to parse,
- `useConverter` (boolean): Enable json mapper to deserialize value,
- `useValidation` (boolean): Enable validation,
- `useType` (boolean): Set explicitly the class/model used by the parameters.


class ArrayHelper
{
	static append(array, other)
	{
		for (var i = 0; i < other.length; i++)
		{
			this.push(other[i]);
		}
 
		return this;
	}
}


class Matrix
{
	constructor(size, values)
	{
		this.size = size;
		this.values = values;
	}

	// static methods
 
	static fromCoords(coordsToConvert)
	{
		return new Matrix
		(
			new Coords(1, 4),
			[
				coordsToConvert.x,
				coordsToConvert.y,
				coordsToConvert.z,
				1
			]
		);
	}
 
	// instance methods
 
	clone()
	{
		var valuesCloned = this.values.slice(0);
 
		var returnValue = new Matrix(this.size, valuesCloned);
 
		return returnValue;
	}
 
	divideScalar(scalar)
	{
		for (var i = 0; i < this.values.length; i++)
		{
			this.values[i] /= scalar;
		}
 
		return this;
	}
 
	equals(other)
	{
		var returnValue = false;
 
		if (this.size.equals(other.size) == true)
		{
			returnValue = true;
 
			for (var i = 0; i < this.values.length; i++)
			{
				var valueThis = this.values[i];
				var valueOther = other.values[i];
				if (valueThis != valueOther)
				{
					returnValue = false;
					break;
				}
			}
		}
 
		return returnValue;
	}
 
	multiply(other)
	{
		if (this.size.x != other.size.y)
		{
			throw "Matrices cannot be multiplied!";
		}
 
		var sizeOfProduct = new Coords(other.size.x, this.size.y);
 
		var valuesMultiplied = [];
 
		for (var y = 0; y < sizeOfProduct.y; y++)
		{
			for (var x = 0; x < sizeOfProduct.x; x++)
			{
				var valueSoFar = 0;
 
				for (var i = 0; i < other.size.y; i++)
				{
					valueSoFar +=
						this.values[y * this.size.x + i]
						* other.values[i * other.size.x + x];
				}
 
				valuesMultiplied.push(valueSoFar);
			}
		}
 
		var returnValue = new Matrix(sizeOfProduct, valuesMultiplied);
 
		return returnValue;
	}
 
	multiplyScalar(scalar)
	{
		for (var i = 0; i < this.values.length; i++)
		{
			this.values[i] *= scalar;
		}
 
		return this;
	}
 
	overwriteWith(other)
	{
		for (var i = 0; i < this.values.length; i++)
		{
			this.values[i] = other.values[i];
		}
 
		return this;
	}
 
	overwriteWithTranslate(displacement)
	{
		this.overwriteWithValues
		([
			1, 0, 0, displacement.x,
			0, 1, 0, displacement.y,
			0, 0, 1, displacement.z,
			0, 0, 0, 1,
		]);
 
		return this;
	}
 
	overwriteWithValues(otherValues)
	{
		for (var i = 0; i < this.values.length; i++)
		{
			this.values[i] = otherValues[i];
		}
 
		return this;
	}
 
	toCoords()
	{
		return new Coords(this.values[0], this.values[1], this.values[2]);
	}
 
	transpose()
	{
		var valuesTransposed = [];
 
		for (var x = 0; x < this.size.x; x++)
		{
			for (var y = 0; y < this.size.y; y++)
			{
				var valueIndex = x * this.size.y + y;
				var value = this.values[valueIndex];
				valuesTransposed.push(value);
			}
		}
 
		var temp = this.size.x;
		this.size.x = this.size.y;
		this.size.y = temp;
 
		this.values = valuesTransposed;
 
		return this;
	}
}

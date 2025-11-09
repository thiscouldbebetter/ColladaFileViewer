
class Coords
{
	constructor(x, y, z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
	}

	static fromXY(x, y)
	{
		return new Coords(x, y, 0);
	}

	static fromXYZ(x, y, z)
	{
		return new Coords(x, y, z);
	}

	add(other)
	{
		this.x += other.x;
		this.y += other.y;
		this.z += other.z;
		return this;
	}
 
	clear()
	{
		this.x = 0;
		this.y = 0;
		this.z = 0;
		return this;
	}
 
	clone()
	{
		return new Coords(this.x, this.y, this.z);
	}
 
	crossProduct(other)
	{
		return this.overwriteWithXYZ
		(
			this.y * other.z - other.y * this.z,
			other.x * this.z - this.x * other.z,
			this.x * other.y - other.x * this.y
		);
	}
 
	divideScalar(scalar)
	{
		this.x /= scalar;
		this.y /= scalar;
		this.z /= scalar;
		return this;
	}
 
	dotProduct(other)
	{
		return (this.x * other.x + this.y * other.y + this.z * other.z);
	}
 
	equals(other)
	{
		var returnValue =
		(
			this.x == other.x
			&& this.y == other.y
			&& this.z == other.z
		);
 
		return returnValue;
	}
 
	magnitude()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
 
	multiplyScalar(scalar)
	{
		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;
		return this;
	}
 
	normalize()
	{
		return this.divideScalar(this.magnitude());
	}
 
	overwriteWith(other)
	{
		this.x = other.x;
		this.y = other.y;
		this.z = other.z;
		return this;
	}
 
	overwriteWithXYZ(x, y, z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	}
 
	subtract(other)
	{
		this.x -= other.x;
		this.y -= other.y;
		this.z -= other.z;
		return this;
	}
}
